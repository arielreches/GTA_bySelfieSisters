var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Graphical Tagging Application' });

});

router.post('/', function(req, res, next) {

    var user = {'first name' : req.body.firstName, 'last name': req.body.lastName, 'email': req.body.email,
        'password' : req.body.password, 'confirm password': req.body.confirmPassword};

    console.log(user);

    res.redirect('home');
});

router.get('/home', function(req, res, next) {
   res.render('home');
});



module.exports = router;