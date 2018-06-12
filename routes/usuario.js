var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

/* GET ALL */
router.get('/', function(req, res, next) {
  Usuario.find(function (err, usuarios) {
    if (err) return next(err);
    res.json(usuarios);
  });
});

/* GET SINGLE BY ID */
router.get('/:id', function(req, res, next) {
  Usuario.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE */
router.post('/', function(req, res, next) {  
  req.body.password = bcrypt.hashSync(req.body.password, 10);  
  Usuario.create(req.body, function (err, post) {
    if (err){
      return res.status(500).json({
        title: 'A ocurrido un error',
        error: err
      });
    } 
    res.json(post);
  });
});

/* SAVE */
router.post('/signin', function(req, res, next) {  
  
  Usuario.findOne( { email: req.body.email } , function (err, usuario) {
    if (err) {
      return res.status(500).json({
        title: 'A ocurrido un error',
        error: err
      });
    }

    if(!usuario){
      return res.status(500).json({
        title: 'Login Failed',
        error: {message: 'Usuario Inválido!'}
      });
    }

    if(!bcrypt.compareSync(req.body.password, usuario.password)){
      return res.status(401).json({
        title: 'Login Failed',
        error: {message: 'Usuario Inválido!'}
      });
    }

    var token = jwt.sign({usuario: usuario}, 'finreal', {expiresIn: 7200});
      return res.status(200).json({
      message: 'Correcto!',
      token: token,
      userId: usuario
    });
  });
});

/* UPDATE */
router.put('/:id', function(req, res, next) {
  Usuario.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE */
router.delete('/:id', function(req, res, next) {
  Usuario.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;