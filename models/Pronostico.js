var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PronosticoSchema = new Schema({
    usuario             : { type: Schema.Types.ObjectId, ref: 'Usuario' },
    partido             : { type: Schema.Types.ObjectId, ref: 'Partido' },
    resultadoLocal      : { type: Number },
    resultadoVisitante  : { type: Number }
  });

  module.exports = mongoose.model('Pronostico', PronosticoSchema);
  