var express = require('express');
var router = express.Router();
var Jornada = require('../models/Jornada');

/* GET ALL EQUIPOS */
router.get('/', function(req, res, next) {
  Jornada.find({}).sort({'nomJornada': 'descending'}).exec(function (err, jornadas) {
    if (err) return next(err);
    res.json(jornadas);
  });
});

module.exports = router;