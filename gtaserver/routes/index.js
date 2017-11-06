var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Graphical Tagging Application' });

});

router.post('/', function(req, res, next) {
    res.render('index',{ title: 'post' });
    var user = {'first name' : req.body.firstName, 'last name': req.body.lastName, 'email': req.body.email,
        'password' : req.body.password, 'confirm password': req.body.confirmPassword};

    console.log(user);

});

router.get('/data', function(req, res, next){

});

module.exports = router;