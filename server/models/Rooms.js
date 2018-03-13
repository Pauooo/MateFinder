const mongoose = require('mongoose');

// Création du schéma pour les Rooms
const RoomSchema = new mongoose.Schema({
  max_users: Number,
  current_users: { type: Number, default: 0 },
  game: String,
  lang: String,
  accepted_users: { type: Number, default: 0 },
  inRoom: { type: Boolean, default: false },
  open: { type: Boolean, default: true },
});

// Création du Model pour les Rooms
const RoomModel = mongoose.model('rooms', RoomSchema);

module.exports = RoomModel;
