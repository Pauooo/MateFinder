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
  current_users: { type: Number, default: 1 },
  game: String,
  lang: String,
  open: { type: Boolean, default: true },
});

// Création du Model pour les Rooms
const RoomModel = mongoose.model('rooms', RoomSchema);

/**
 * Socket.io
 */

const CreateNewRoom = (data) => {
  // On crée une instance du Model Room
  const room = new RoomModel();
  // On défini ces propriétés
  room.max_users = data.format;
  if (data.team) room.current_users = data.teamCount;
  room.game = data.game;
  room.lang = data.lang;

  // On le sauvegarde dans MongoDB !
  room.save((err) => {
    if (err) {
      throw err;
    }
    console.log('room ajoutée avec succès !');
    // RoomModel.find(null, (erreur, comms) => {
    //   if (erreur) {
    //     throw erreur;
    //   }
    //   // comms est un tableau de hash
    //   // console.log(comms);
    // });
  });
};

io.on('connection', (socket) => {
  console.log(socket.id);
  // quand l'user lance une recherche
  socket.on('start_match', (data) => {
    // On recupere les room open correspondant aux critères
    RoomModel.find()
      .where('open', true)
      .where('game', data.game)
      .where('lang', data.lang)
      .where('max_users', data.format)
      .exec((err, comms) => {
        if (err) throw err;
        if (comms.length === 0) {
          CreateNewRoom(data);
        }
        else {
          let found = false;
          comms.forEach((comm) => {
            if (found) return;
            if (data.team && (comm.max_users - comm.current_users) >= data.teamCount) {
              console.log(`Ajout a la room ${comm.id}`);
              found = true;
            }
            else if (!data.team) {
              console.log(`Ajout a la room ${comm.id}`);
              found = true;
            }
          });
          if (!found) {
            CreateNewRoom(data);
          }
          console.log(comms);
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
