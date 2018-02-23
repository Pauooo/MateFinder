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
 // du coup toutes mes actions (login, psswordLost) vont être dans connexion ? oui, a  la suite
 // mais là je suis dans le serveur on est d'accord Oui, mais en gros, quand le client se connecte au serveur, il tape sur "l'event" connection
 // cet event il recupere l'argument "socket" qui lui du coup va contenir l'id du socket et pleins d'autres infos
// quand un utilisateur se connecte au socket
io.on('connection', (socket) => {
  // genre comme ça :
  // socket.io('monaction', () => {
  //   return;
  // })
  // le socket, designe chaque client qui va instancier une connexion entre lui et le serveur
  // et donc c'est ici qu'on lui dit: Ok, quand je recois l'info 'createAccount' d'un client, je lui fais ça
  // inutile de redeclarer socket ici, il est deja déclaré en haut
  socket.on('createAccount', (data) => {
    console.log(data);
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
      console.log('Commentaire ajouté avec succès !');
    });

    // quand l'user quitte le site
    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  });
});

/*
 * Server
 */
server.listen(3000, () => {
  console.log('listening on *:3000');
});
