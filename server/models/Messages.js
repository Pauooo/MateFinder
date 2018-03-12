const mongoose = require('mongoose');

// Création du schéma pour les Users
const MessageSchema = new mongoose.Schema({
  user_id: String,
  room_id: String,
  username: String,
  message: String,
});

// Création du Model pour les Users
const MessageModel = mongoose.model('messages', MessageSchema);

module.exports = MessageModel;
