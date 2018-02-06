var mongoose = require('mongoose');

var EquipoSchema = new mongoose.Schema({
    
    nomEquipo: { type: String, unique: true, required: true },
    nomEquipoCompleto: { type: String, unique: true, required: true },
    imgUrl: String
  });

  module.exports = mongoose.model('Equipo', EquipoSchema);