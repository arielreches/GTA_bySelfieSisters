var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/GTADatabase";
var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {
  return res.redirect('signin');
});

router.get('/signin', function(req, res, next) {
  res.render('index', { title: 'Graphical Tagging Application' });

});

router.post('/signin', function(req, res, next) {

//Sign in page
  MongoClient.connect(url, function(err, db) {
    db.collection('CredentialCollection', function(err, collection) {
      collection.findOne({'username' : req.body.username}, function(err, doc) {
        console.log(doc);
        if(doc){
          console.log("Username Exists!");
	        if((doc.password) == (req.body.password)){
            console.log("Password works!" + doc.firstName);
            req.session.firstName = doc.firstName;
            return res.redirect('home');
          } else{
            console.log("Password incorrect!");
            return res.redirect('signin');
            }
        } else{
          return res.redirect('signin');
        }
       });

    // our collection has returned, now we can close the database
       db.close();
    });
  });
});


//Sign up page

router.post('/signup', function(req, res, next) {
  var user = {'firstName' : req.body.firstName, 'lastName': req.body.lastName, 'username' : req.body.username, 'email': req.body.email,
        'password' : req.body.password, 'confirmPassword': req.body.confirmPassword};

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("CredentialCollection").insertOne(user, function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    })
  });

  console.log(user);

  res.redirect('home');
});

router.get('/home', function(req, res, next) {
  console.log("SESSION: " + req.session.firstName);
  res.render('home', {test : req.session.firstName});
});



module.exports = router;
