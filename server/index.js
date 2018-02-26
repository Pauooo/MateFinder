/*
 * Require
 */
const express = require('express');
const { Server } = require('http');
const mongoose = require('mongoose');
const socket = require('socket.io');


/*
 * Vars
 */
const app = express();
const server = Server(app);
const io = socket(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

/**
 * MongoDB
 */

// Connexion a MongoDB sur la DB "matefinder"
mongoose.connect('mongodb://localhost/matefinder', (err) => {
  if (err) {
    throw err;
  }
});

/*
* Matching
*/

// Création du schéma pour les Rooms
const RoomSchema = new mongoose.Schema({
  max_users: Number,
  current_users: { type: Number, default: 0 },
  game: String,
  lang: String,
  open: { type: Boolean, default: true },
});

// Création du Model pour les Rooms
const RoomModel = mongoose.model('rooms', RoomSchema);

/*
* authentication
*/

// Création du schéma pour les Users
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  userSocketId: String,
  room_id: { type: String, default: -1 },
});

// Création du Model pour les Users
const UserModel = mongoose.model('users', UserSchema);

/**
 * Socket.io
 */

const SendNotificationToRoomUsers = (roomId, Infos) => {
  UserModel.find()
    .where('room_id', roomId)
    .exec((err, users) => {
      if (err) {
        throw err;
      }
      else {
        users.forEach((user) => {
          io.sockets.connected[user.userSocketId].emit(Infos);
        });
      }
    });
};

const SendNotificationToUser = (userSocket, Infos) => {
  UserModel.find()
    .where('userSocketId', userSocket)
    .exec((err, users) => {
      if (err) {
        throw err;
      }
      else {
        users.forEach((user) => {
          io.sockets.connected[user.userSocketId].emit(Infos);
        });
      }
    });
};

const AddUserRoom = (userSocket, roomId, usersInRoom) => {
  // on update room_id de l'user dans la Bdd
  const userConditions = { userSocketId: userSocket };
  const userUpdate = { room_id: roomId };
  const userOptions = { multi: true };
  const userCallBack = (err) => {
    if (err) {
      throw err;
    }
  };
  UserModel.update(userConditions, userUpdate, userOptions, userCallBack);

  // on update le nombre d'user dans la room
  const roomConditions = { _id: roomId };
  const roomUpdate = { current_users: usersInRoom + 1 };
  const roomOptions = { multi: true };
  const roomCallBack = (err) => {
    if (err) {
      throw err;
    }
    else {
      RoomModel.find()
        .where('_id', roomId)
        .exec((err, datas) => {
          if (err) {
            throw err;
          }
          else {
            datas.forEach((data) => {
              if (data.current_users === data.max_users) {
                const callBackUpdate = (err) => {
                  if (err) throw err;
                };
                RoomModel.update({ _id: roomId }, { open: false }, roomOptions, callBackUpdate);
                SendNotificationToRoomUsers(roomId, 'RoomFound');
              }
            });
          }
        });
    }
  };
  RoomModel.update(roomConditions, roomUpdate, roomOptions, roomCallBack);
};

const resetUserRoomId = (userSocket) => {
  const conditions = { userSocketId: userSocket };
  const update = { room_id: '-1' };
  const options = { multi: true };
  const callback = (err) => {
    if (err) {
      throw err;
    }
  };
  UserModel.update(conditions, update, options, callback);
};

const RemoveUserRoom = (userSocket) => {
  // On récupère l'user
  UserModel.find()
    .where('userSocketId', userSocket)
    .exec((err, users) => {
      if (err) throw err;
      if (users.length === 0) return;
      // on défini une var globale qui contiendra l'id de la room
      let roomId;
      users.forEach((user) => {
        roomId = user.room_id;
      });

      console.log('test1');
      // On recupère la room avec l'id récupéré
      RoomModel.find()
        .where('_id', roomId)
        .exec((err2, rooms) => {
          if (err) throw err;
          rooms.forEach((room) => {
            console.log('test2');
            if (room.current_users - 1 === 0) {
              console.log('test3');
              RoomModel.update({ _id: roomId }, { open: false }, { multi: true }, (err3) => {
                console.log('test4');
                if (err3) throw err3;
                resetUserRoomId(userSocket);
              });
            }
            else {
              RoomModel.update(
                { _id: roomId },
                { current_users: room.current_users - 1 },
                { multi: true },
                (err3) => {
                  if (err3) throw err3;
                  resetUserRoomId(userSocket);
                  if (room.open === false) {
                    console.log(room.id);
                    UserModel.find()
                      .where('room_id', room.id)
                      .exec((err4, users2) => {
                        users2.forEach((user) => {
                          if (user.userSocketId !== userSocket) {
                            SendNotificationToUser(user.userSocketId, 'UserRoomNotAccepted');
                            RoomModel.update({ _id: roomId }, { open: true }, { multi: true }, (err5) => {
                              if (err5) throw err5;
                            });
                          }
                        });
                      });
                  }
                },
              );
            }
          });
        });
    });
};

const CreateNewRoom = (data, userSocket) => {
  // On crée une instance du Model Room
  const room = new RoomModel();
  // On défini ces propriétés
  room.max_users = data.format;
  if (data.team) room.current_users = data.teamCount;
  room.game = data.game;
  room.lang = data.lang;

  // On le sauvegarde dans MongoDB !
  room.save((err, roomData) => {
    if (err) {
      throw err;
    }
    console.log('room ajoutée avec succès !');
    AddUserRoom(userSocket, roomData.id, roomData.current_users);
  });
};
// du coup toutes mes actions (login, psswordLost) vont être dans connexion ?
// oui, a  la suite
// mais là je suis dans le serveur on est d'accord
// Oui, mais en gros, quand le client se connecte au serveur, il tape sur "l'event" connection
// cet event il recupere l'argument "socket" qui lui du coup
// va contenir l'id du socket et pleins d'autres infos
// quand un utilisateur se connecte au socket
io.on('connection', (socket) => {
  // genre comme ça :
  // socket.io('monaction', () => {
  //   return;
  // })
  // le socket, designe chaque client qui va instancier une connexion entre lui et le serveur
  // et donc c'est ici qu'on lui dit: Ok, quand je recois l'info 'createAccount' d'un client,
  // je lui fais ça ...
  // inutile de redeclarer socket ici, il est deja déclaré en haut

  let MinTimeBeforeMatch = null;

  // quand l'user lance une recherche
  socket.on('start_match', (data) => {
    // On recupere les rooms open correspondant aux critères
    MinTimeBeforeMatch = setTimeout(() => {
      RoomModel.find()
        .where('open', true)
        .where('game', data.game)
        .where('lang', data.lang)
        .where('max_users', data.format)
        .exec((err, comms) => {
          if (err) throw err;
          if (comms.length === 0) {
            CreateNewRoom(data, socket.id);
          }
          else {
            let found = false;
            comms.forEach((comm) => {
              if (found) return;
              if (data.team && (comm.max_users - comm.current_users) >= data.teamCount) {
                console.log(`Ajout a la room ${comm.id}`);
                AddUserRoom(socket.id, comm.id, comm.current_users);
                found = true;
              }
              else if (!data.team) {
                console.log(`Ajout a la room ${comm.id}`);
                AddUserRoom(socket.id, comm.id, comm.current_users);
                found = true;
              }
            });
            if (!found) {
              CreateNewRoom(data, socket.id);
            }
          }
        });
    }, 20000);
  });

  socket.on('accepted_match', () => {
    // on recupère l'id de la room
    UserModel.find()
      .where('userSocketId', socket.id)
      .exec((err, users) => {
        if (err) {
          throw err;
        }
        else {
          users.forEach((user) => {
            UserModel.find()
              .where('room_id', user.room_id)
              .exec((err2, users2) => {
                if (err) throw err;
                else {
                  users2.forEach((user2) => {
                    io.sockets.connected[user2.userSocketId].emit('updateUserAccepted', 1);
                  });
                }
              });
          });
        }
      });
  });

  socket.on('refuse_match', () => {
    if (!MinTimeBeforeMatch._called) clearTimeout(MinTimeBeforeMatch);
    else RemoveUserRoom(socket.id);
  });

  // creation du compte user
  socket.on('createAccount', (data) => {
    const user = new UserModel();
    // On défini ces propriétés
    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    user.userSocketId = socket.id;
    user.save((err) => {
      if (err) {
        throw err;
      }
      // console.log('Commentaire ajouté avec succès !');
    });
  });
  // quand l'user quitte le site
  socket.on('disconnect', () => {
    RemoveUserRoom(socket.id);
  });
});

/*
 * Server
 */
server.listen(3000, () => {
  console.log('listening on *:3000');
});
