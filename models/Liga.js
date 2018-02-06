var mongoose = require('mongoose');

var LigaSchema = new mongoose.Schema({

    nomLiga: String,
    temporada: Number
  });

  module.exports = mongoose.model('Liga', LigaSchema);