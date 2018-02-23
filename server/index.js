/*
 * Require
 */
const express = require('express');
const { join } = require('path');
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

// /!\ TABLE USERS DE TEST /!\
const UserSchema = new mongoose.Schema({
  userSocketId: String,
  room_id: { type: String, default: -1 },
});

const UserModel = mongoose.model('users', UserSchema);

/**
 * Socket.io
 */

const SendNotificationToRoomUsers = (roomId) => {
  UserModel.find()
    .where('room_id', roomId)
    .exec((err, users) => {
      if (err) {
        throw err;
      }
      else {
        users.forEach((user) => {
          io.sockets.connected[user.userSocketId].emit('RoomFound');
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
                SendNotificationToRoomUsers(roomId);
              }
            });
          }
        });
    }
  };
  RoomModel.update(roomConditions, roomUpdate, roomOptions, roomCallBack);
};

const RemoveUserRoom = (userSocket) => {
  UserModel.find()
    .where('userSocketId', userSocket)
    .exec((err, users) => {
      let roomId;
      users.forEach((user) => {
        roomId = user.room_id;
      });
    });

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

io.on('connection', (socket) => {
  let timeOut = null;

  // /!\ TABLE USERS DE TEST /!\
  const user = new UserModel();
  user.userSocketId = socket.id;
  user.save((err, data) => {
    if (err) {
      throw err;
    }
    // console.log(data);
  });

  // quand l'user lance une recherche
  socket.on('start_match', (data) => {
    // On recupere les rooms open correspondant aux critères
    timeOut = setTimeout(() => {
      RoomModel.find()
        .where('open', true)
        .where('game', data.game)
        .where('lang', data.lang)
        .where('max_users', data.format)
        .exec((err, comms) => {
          if (err) throw err;
          if (comms.length === 0) {
            console.log(socket.id);
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
              console.log(socket.id);
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
              .exec((err, users) => {
                if (err) throw err;
                else {
                  users.forEach((user) => {
                    io.sockets.connected[user.userSocketId].emit('updateUserAccepted', 1);
                  });
                }
              });
          });
        }
      });
  });

  socket.on('refuse_match', () => {
    if (timeOut) clearTimeout(timeOut);
    RemoveUserRoom(socket.id);
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
