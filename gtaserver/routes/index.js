var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Graphical Tagging Application' });

});

router.post('/', function(req, res, next) {
    res.render('index',{ title: 'post' });

});

router.get('/data', function(req, res, next){

});

module.exports = router;