var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartidoSchema = new Schema({
    jornada             : { type: Schema.Types.ObjectId, ref: 'Jornada', required: true },
    fechaPartido        : { type: String, required: true },
    horaPartido         : { type: String, required: true },
    lugarPartido        : { type: String },
    equipoLocal         : { type: Schema.Types.ObjectId, ref: 'Equipo' },
    resultadoLocal      : { type: Number },
    equipoVisitante     : { type: Schema.Types.ObjectId, ref: 'Equipo' },
    resultadoVisitante  : { type: Number },
    finalizado          : { type: Boolean, required: true },
    liga                : { type: Schema.Types.ObjectId, ref: 'Liga' }
  });

  module.exports = mongoose.model('Partido', PartidoSchema);

  