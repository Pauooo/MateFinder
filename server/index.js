/*
 * Require
 */
const express = require('express');
const { Server } = require('http');
const mongoose = require('mongoose');
const socket = require('socket.io');
const bcrypt = require('bcrypt');
const RoomModel = require('./models/Rooms');
const UserModel = require('./models/Users');
const MessageModel = require('./models/Messages');
const matching = require('./controllers/matching');
const jwtAuth = require('socketio-jwt-auth');
const config = require('./config');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const igdb = require('igdb-api-node').default;
const serveStatic = require('serve-static');


/*
 * Vars
 */
const app = express();
const server = Server(app);
const io = socket(server);
const client = igdb('ee3ee465baaf30227734736b02e125e7');

/*
. Routes pour axios
*/

// On utilise body-parser pour avoir les info de POST et GET
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(serveStatic('public/', { index: ['index.html'] }));

// Création de compte et envoie du token
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  // on verifie que le username est unique
  UserModel.findOne({ username }, (err, existingUsername) => {
    if (err) throw err;
    if (existingUsername) {
      res.status(401).send('UsernameUsed');
    }
    else {
      // on verifie que l'email est unique
      UserModel.findOne({ email }, (err, existingEmail) => {
        if (err) throw err;
        if (existingEmail) {
          res.status(401).send('WrongEmail');
        }
        else {
          const user = new UserModel();
          // On définit ces propriétés
          user.username = username;
          user.email = email;
          // on hash le mot de passe avant de le définir dans la BDD
          const myPlaintextPassword = password;
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(myPlaintextPassword, salt);
          user.password = hash;
          // on sauve en BDD
          user.save((err) => {
            if (err) throw err;
            else {
              const Newtoken = jwt.sign({
                username: user.username,
                password: user.password,
              }, config.secret, { expiresIn: 60 * 60 });
              res.json({ Newtoken });
              // res.send('accountCreated');
            }
          });
        }
      });
    }
  });
});

// Login et envoie du token
app.post('/login', (req, res) => {
  const { username, password, token } = req.body;

  UserModel.findOne()
    .where('username', username)
    .exec((err, user) => {
      if (err) {
        throw err;
      }
      if (user === null) {
        res.status(401).send('WrongUser');
      }
      else if (bcrypt.compareSync(password, user.password) || (token && password === user.password)) {
        // Passwords match
        const Newtoken = jwt.sign({
          username: user.username,
          password: user.password,
        }, config.secret, { expiresIn: 60 * 1 });
        res.json({ Newtoken });
        // res.send('signIn');
      }
      else {
        res.status(401).send('WrongPassword');
      }
    });
});

const indexPath = `${__dirname}/public/index.html`;
app.get('*', (req, res) => {
  res.sendFile(indexPath);
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


/**
 * Socket.io
 */

// using middleware
io.use(jwtAuth.authenticate({
  secret: config.secret, // required, used to verify the token's signature
  algorithm: 'HS256', // optional, default to be HS256
  // succeedWithoutToken: true,
}, (payload, done) => {
  // done is a callback, you can use it as follows
  UserModel.findOne({ username: payload.username }, (err, user) => {
    if (err) {
      // return error
      return done(err);
    }
    if (!user) {
      // return fail with an error message
      return done(null, false, 'user does not exist');
    }
    // return success with a user info
    return done(null, user);
  });
}));

/**
 * Socket.io
 */
io.on('connection', (socket) => {
  let MinTimeBeforeMatch = null;

  UserModel.update(
    { username: socket.request.user.username },
    { userSocketId: socket.id },
    {},
    (err) => {
      if (err) throw err;
    },
  );

  // now you can access user info through socket.request.user
  // socket.request.user.logged_in will be set to true if the user was authenticated
  socket.emit('success', {
    message: 'success logged in!',
    user: socket.request.user,
  });

  socket.on('send_message', ({ inputMessage }) => {
    UserModel.findOne({ userSocketId: socket.id })
      .exec((err, user) => {
        if (err) {
          throw err;
        }
        // On crée une instance du Model Room
        const message = new MessageModel();
        // On défini ces propriétés
        message.user_id = user.id;
        message.room_id = user.room_id;
        message.username = user.username;
        message.message = inputMessage;

        // On le sauvegarde dans MongoDB !
        message.save((err3) => {
          if (err3) {
            throw err3;
          }
          MessageModel.find()
            .where('room_id', user.room_id)
            .exec((err4, messages) => {
              if (err4) {
                throw err4;
              }
              UserModel.find()
                .where('room_id', user.room_id)
                .exec((err2, users) => {
                  if (err2) {
                    throw err2;
                  }
                  else {
                    users.forEach((user2) => {
                      if (io.sockets.connected[user2.userSocketId]) {
                        io.sockets.connected[user2.userSocketId].emit('update_room_messages', messages);
                      }
                    });
                  }
                });
            });
        });
      });
  });

  socket.on('save_user_info', ({ username, email }) => {
    UserModel.update(
      { userSocketId: socket.id },
      { username, email },
      {},
      (err) => {
        if (err) throw err;
      },
    );
  });

  socket.on('save_user_password', ({ currentpassword, password }) => {
    UserModel.findOne({ userSocketId: socket.id })
      .exec((err, user) => {
        if (err) {
          throw err;
        }
        if (bcrypt.compareSync(currentpassword, user.password)) {
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(password, salt);
          UserModel.update(
            { userSocketId: socket.id },
            { password: hash },
            {},
            (err2) => {
              if (err2) throw err2;
              socket.emit('response_save_password', true);
            },
          );
          return;
        }
        socket.emit('response_save_password', false);
      });
  });

  // quand l'user lance une recherche
  socket.on('start_match', (data) => {
    // On recupere les rooms open correspondant aux critères
    client.pulses({
      fields: '*',
      limit: 6,
      order: 'published_at:desc',
      search: data.searchname,
    }).then((response) => {
      socket.emit('news-api', response);
    }).catch((error) => {
      throw error;
    });
    MinTimeBeforeMatch = setTimeout(() => {
      RoomModel.find()
        .where('open', true)
        .where('game', data.game)
        .where('lang', data.lang)
        .where('max_users', data.format)
        .exec((err, comms) => {
          if (err) throw err;
          if (comms.length === 0) {
            matching.CreateNewRoom(data, socket.id);
          }
          else {
            let found = false;
            comms.forEach((comm) => {
              if (found) return;
              if (data.team && (comm.max_users - comm.current_users) >= data.teamCount) {
                matching.AddUserRoom(socket.id, comm.id, comm.current_users, data.teamCount, io);
                found = true;
              }
              else if (!data.team) {
                matching.AddUserRoom(socket.id, comm.id, comm.current_users, 1, io);
                found = true;
              }
            });
            if (!found) {
              matching.CreateNewRoom(data, socket.id, io);
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
                  RoomModel.findOne({ _id: user.room_id })
                    .exec((er, room) => {
                      if (er) {
                        throw er;
                      }
                      else {
                        const callBackUpdate = (err3) => {
                          if (err3) throw err;
                        };
                        RoomModel.update(
                          { _id: user.room_id },
                          {
                            accepted_users: room.accepted_users + ((user.inTeam) ? user.TeamCount : 1),
                            inRoom: (room.accepted_users + ((user.inTeam) ? user.TeamCount : 1)) === room.max_users,
                          },
                          {},
                          callBackUpdate,
                        );
                      }
                    });
                  users2.forEach((user2) => {
                    io.sockets.connected[user2.userSocketId].emit('updateUserAccepted', { number: (user.inTeam) ? user.TeamCount : 1, users2 });
                  });
                }
              });
          });
        }
      });
  });

  socket.on('refuse_match', ({ team, teamCount }) => {
    if (!MinTimeBeforeMatch._called) clearTimeout(MinTimeBeforeMatch);
    else matching.RemoveUserRoom(socket.id, team, teamCount, io);
  });

  socket.on('user_exit_chatroom', () => {
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
                    const newusers = users2.filter(usr => usr.userSocketId !== socket.id);
                    io.sockets.connected[user2.userSocketId].emit('updateUserAccepted', { number: 0, newusers });
                  });
                  matching.RemoveUserRoom(socket.id, user.team, user.TeamCount, io);
                }
              });
          });
        }
      });
  });

  socket.on('get_users_room_list', () => {
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
                  const newusers = users2;
                  socket.emit('updateUserAccepted', { number: 0, newusers });
                }
              });
          });
        }
      });
  });

  // quand l'user quitte le site
  socket.on('disconnect', () => {
    UserModel.findOne({ userSocketId: socket.id }, (err, user) => {
      if (err) throw err;
      else {
        matching.RemoveUserRoom(socket.id, user.inTeam, user.TeamCount, io);
      }
    });
  });
});

/*
 * Server
 */
server.listen(3000, () => {
  console.log('listening on *:3000');
});
