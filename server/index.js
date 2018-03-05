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
const matching = require('./controllers/matching');
const jwtAuth = require('socketio-jwt-auth');
const config = require('./config');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


/*
 * Vars
 */
const app = express();
const server = Server(app);
const io = socket(server);
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
                exp: Math.floor(Date.now() / 1000) + 60,
                username: user.username,
                password: user.password,
              }, config.secret);
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
        console.log(err);
        return;
      }
      if (user === null) {
        res.status(401).send('WrongUser');
      }
      else if (bcrypt.compareSync(password, user.password) || (token && password === user.password)) {
        // Passwords match
        const Newtoken = jwt.sign({
          username: user.username,
          password: user.password,
        }, config.secret, { expiresIn: 60 });
        res.json({ Newtoken });
        // res.send('signIn');
      }
      else {
        res.status(401).send('WrongPassword');
      }
    });
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

  console.log('Authentication passed!');

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
                matching.AddUserRoom(socket.id, comm.id, comm.current_users, io);
                found = true;
              }
              else if (!data.team) {
                console.log(`Ajout a la room ${comm.id}`);
                matching.AddUserRoom(socket.id, comm.id, comm.current_users, io);
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
    else matching.RemoveUserRoom(socket.id, io);
  });


  // quand l'user quitte le site
  socket.on('disconnect', () => {
    matching.RemoveUserRoom(socket.id, io);
  });
});

/*
 * Server
 */
server.listen(3000, () => {
  console.log('listening on *:3000');
});
