/*
 * Require
 */
const express = require('express');
const { Server } = require('http');
const mongoose = require('mongoose');
const socket = require('socket.io');
const RoomModel = require('./models/Rooms');
const UserModel = require('./models/Users');
const matching = require('./controllers/matching');
const jwtAuth = require('socketio-jwt-auth');
const config = require('./config');


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

// using middleware
io.use(jwtAuth.authenticate({
  secret: config.secret, // required, used to verify the token's signature
  algorithm: 'HS256', // optional, default to be HS256
  succeedWithoutToken: true,
}, (payload, done) => {
  console.log(payload);
  // done is a callback, you can use it as follows
  UserModel.findOne({ _id: payload.sub }, (err, user) => {
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

  console.log('Authentication passed!');
  // now you can access user info through socket.request.user
  // socket.request.user.logged_in will be set to true if the user was authenticated
  socket.emit('success', {
    message: 'success logged in!',
    user: socket.request.user,
  });

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
            matching.CreateNewRoom(data, socket.id);
          }
          else {
            let found = false;
            comms.forEach((comm) => {
              if (found) return;
              if (data.team && (comm.max_users - comm.current_users) >= data.teamCount) {
                console.log(`Ajout a la room ${comm.id}`);
                matching.AddUserRoom(socket.id, comm.id, comm.current_users);
                found = true;
              }
              else if (!data.team) {
                console.log(`Ajout a la room ${comm.id}`);
                matching.AddUserRoom(socket.id, comm.id, comm.current_users);
                found = true;
              }
            });
            if (!found) {
              matching.CreateNewRoom(data, socket.id);
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
    else matching.RemoveUserRoom(socket.id);
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
    matching.RemoveUserRoom(socket.id);
  });
});

/*
 * Server
 */
server.listen(3000, () => {
  console.log('listening on *:3000');
});
