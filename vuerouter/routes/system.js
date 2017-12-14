//System routing - edit to make useful for specifically systems.

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var System = require('../models/System.js');

/* GET ALL SYSTEMS */
router.get('/init', function(req, res, next) {
  System.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE SYSTEM BY ID */
router.get('/:id', function(req, res, next) {
  System.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id/tag', function(req, res, next) {
  console.log("put ran")
  System.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    console.log(post);
  })
})

/* GET SYSTEMS'S GROUPS BY ID */
router.get('/:id/groups', function(req, res, next) {
  System.findById(req.params.id).populate('Group').exec(function (err, systemgroups) {
    if (err) return next(err);
    res.json(systemgroups);
    console.log(systemgroups);
  });
});

/* GET ARRAY OF SYSTEMS */
router.post('/many', function(req, res, next) {
  console.log(req.body)
  System.find({
    '_id': { $in: req.body}
  }, function(err, systems){
     console.log(systems);
     res.json(systems);
  });
});

/* SAVE SYSTEM */
/* router.post('/', function(req, res, next) {
  System.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); */

/* UPDATE SYSTEM */
router.put('/:id', function(req, res, next) {
  System.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    console.log(post);
    if (err) return next(err);
    res.json(post);
  });
  console.log(req.body);
});

/* DELETE SYSTEM */
router.delete('/:id', function(req, res, next) {
  System.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;