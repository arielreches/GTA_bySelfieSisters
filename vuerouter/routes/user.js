var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

var currentUser = null;

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});


/* GET CURRENT USER BY VOODOO MAGIC */
router.get('/curr', function(req, res, next) {
  if(currentUser === null){
    console.log('No user logged')
  }
  res.json(currentUser);
});

/* GET USER BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log(post);
  });
});

/* GET SINGLE USER BY LOGIN INFO */
router.get('/login/t', function(req, res, next) {
  //use mongoose User var to find one user that matches the request, getting back password field
  User.findOne({'username': req.query.username}, function (err, user) {
    if (err) return next(err)
    //if passwords match
    if(req.query.password == user.password) {
      res.send('success')
      currentUser = user;
    } else {
      res.send('failure')
    }
  })
});

router.post('/', function(req, res, next) {
  //use mongoose User var to create a user instance in the db
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post)
  });
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE USER*/
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;