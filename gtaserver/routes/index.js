var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/GTADatabase";
var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.set("view engine","pug");

//change these values to reflect your environment
var collection="CSVFiles";
var port=3000;


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
            console.log("Password works!");
            req.session.firstName = doc.firstName;
            req.session.lastName = doc.lastName;
            return res.redirect('home');

          } else{
            console.log("Password incorrect!");
            return res.redirect('signin');
            }
        } else{
          console.log("Username incorrect!");
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
  req.session.firstName = req.body.firstName;
  res.redirect('home');
});



//my code looks cleaner
router.get('/home', function(req, res, next) {
    console.log("/home: made it")
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log("/home: connection error");
            throw err;
        }
        else{
            console.log("/home: connection success");
            db.collection(collection).find().toArray(function(err, results) {
                if(err){
                    console.log("/home: collection not found");
                    throw err;
                }
                else{
                    console.log("/home: collection found")
                    var keys = Object.keys(results[0]);
                    var key = [keys.length-1];
                    var j = 0;
                    for(var i = 1 ; i < Object.keys(results[0]).length ; i++){
                        key[j]=keys[i];
                        j++;
                    }

                    //yes it makes that much of a difference to me.
                    var Fname = req.session.firstName;
                    var Lname = req.session.lastName;

                    Fname = Fname.charAt(0).toUpperCase() + Fname.slice(1);
                    Lname = Lname.charAt(0).toUpperCase() + Lname.slice(1);

                    var capitalized = Fname+" "+Lname;

                    console.log(capitalized)

                    res.render('home', { UserName:capitalized, keys:key, data:results} )
                }
            });
        }
    });
});

//this handles updating the systems from the front end
router.post('/dbupdate', function(req,res, next){
    console.log("/dbupdate: made it")
    var newObj = req.body;

    console.log(newObj)
    MongoClient.connect(url, function(err,db){
        if(err){
            console.log("/dbupdate: connection error");
            throw err;
        }
        else{
            console.log("/dbupdate: connection good");
            db.collection(collection).find().toArray(function(err,results){
                if(err){
                    console.log("/dbupdate: collection not found");
                    throw err;
                }
                else{
                    console.log("/dbupdate: collection found");
                    for(obj in results){
                        var oldObj = results[obj];
                        if(oldObj["_id"].equals(newObj["_id"])){

                            delete newObj["_id"];
                            delete newObj["checked"]

                            db.collection(collection).updateOne(oldObj,newObj,function(err,res){
                                if(err){
                                    console.log("/dbupdate: collection update error");
                                    throw err;
                                }
                                else{
                                    console.log("/dbupdate: 1 document updated");
                                }
                            })
                        }
                    }
                }
            })
        }
    })
    return res.redirect('home');
})


module.exports = router;