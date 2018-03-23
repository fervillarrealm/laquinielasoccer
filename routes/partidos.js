var express = require('express');
var router = express.Router();
var Equipo = require('../models/Equipo');
var Partido = require('../models/Partido');
var Jornada = require('../models/Jornada');

/* GET BY ID PARTIDOS */
router.get('/:id', function(req, res, next) {
    Jornada.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        Partido.find({ jornada: post}).populate('equipoLocal').populate('equipoVisitante').exec(function (err, partidos) {
            if (err) return next(err);
            res.json(partidos);
        });
    });
});

module.exports = router;