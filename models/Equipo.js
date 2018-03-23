var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EquipoSchema = new Schema({
    posicion  : { type: Number },
    nomEquipo : { type: String, unique: true, required: true },
    puntos    : { type: Number },
    jj        : { type: Number },
    dg        : { type: Number },
    jg        : { type: Number },
    je        : { type: Number },
    jp        : { type: Number },
    gf        : { type: Number },
    gc        : { type: Number },
    imgUrl    : { type: String },
    liga      : { type: Schema.Types.ObjectId, ref: 'Liga' }
  });

  module.exports = mongoose.model('Equipo', EquipoSchema);
  