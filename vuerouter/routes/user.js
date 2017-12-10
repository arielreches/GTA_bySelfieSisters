var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE USER BY ID */
router.get('/login', function(req, res, next) {
  User.findOne({'username': req.query.username}, 'password', function (err, user) {
    if (err) return next(err)
    if(req.query.password == user.password) {
      res.send('success')
    } else {
      res.send('failure')
    }
  })
});

router.post('/', function(req, res, next) {
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