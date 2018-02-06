var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, email: true, unique: true, required: true },
    password: { type: String, password: true, required: true },
    alias: { type: String, unique: true, required: true }
  });

  module.exports = mongoose.model('Usuario', UsuarioSchema);