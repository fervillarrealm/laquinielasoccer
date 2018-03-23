var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JornadaSchema = new Schema({
    nomJornada          : { type: String, required: true },
    liga                : { type: Schema.Types.ObjectId, ref: 'Liga' }
  });

  module.exports = mongoose.model('Jornada', JornadaSchema);

  