var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Liga = require('../models/Liga.js');

router.get('/', function(req, res, next) {
    Liga.find(function (err, ligas) {
    if (err) return next(err);
    console.log(ligas);
    res.json(ligas);
  });
});


router.get('/:id', function(req, res, next) {
  Liga.findById(req.params.id, function (err, liga) {
    if (err) return next(err);
    res.json(liga);
  });
});


router.post('/', function(req, res, next) {
  Liga.create(req.body, function (err, liga) {
    if (err) return next(err);
    res.json(liga);
  });
});


router.put('/:id', function(req, res, next) {
  Liga.findByIdAndUpdate(req.params.id, req.body, function (err, liga) {
    if (err) return next(err);
    res.json(liga);
  });
});


router.delete('/:id', function(req, res, next) {
  Liga.findByIdAndRemove(req.params.id, req.body, function (err, liga) {
    if (err) return next(err);
    res.json(liga);
  });
});

module.exports = router;