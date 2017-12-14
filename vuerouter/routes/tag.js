//System routing - edit to make useful for specifically systems.

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tag = require('../models/Tag.js');

/* GET ALL TAGS */
router.get('/init', function(req, res, next) {
  Tag.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});


/* SAVE TAG */
 router.post('/', function(req, res, next) {
  Tag.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); 


/* DELETE TAG */
router.delete('/:id', function(req, res, next) {
  Tag.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;