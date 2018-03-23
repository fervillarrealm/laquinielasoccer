var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var https = require('https');
var fs = require('fs');
var Equipo = require('../models/Equipo');

/* GET ALL EQUIPOS */
router.get('/', function(req, res, next) {
  Equipo.find({}).sort({'puntos': 'descending'}).exec(function (err, equipos) {
    if (err) return next(err);
    res.json(equipos);
  });
});


module.exports = router;