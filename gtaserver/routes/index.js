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
            // func();
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

  res.redirect('home');
});

router.get('/home', function(req, res, next) {

  MongoClient.connect(url, function(err, db){
      console.log("made it asdfasd")
      if(err){
          console.log("connection error");
          throw err;
      }
      //if we're connected to the database...
      else{
          console.log("connection success");



              db.collection(collection).find().toArray(function(err, results) {
                  if(err){
                      console.log("collection error");
                      throw err;
                  }
                  else{


                      // console.log(results);
                      var keys = Object.keys(results[0]);
                      var key = [keys.length-1];
                      var j = 0;
                      for(var i = 1 ; i < Object.keys(results[0]).length ; i++){
                          key[j]=keys[i];
                          j++;
                      }

                      holder = [];
                      for(obj in results){
                          temp = {};
                          for(name in key){
                              temp[key[name]]=results[obj][key[name]];
                          }
                          holder[obj]=temp;
                          temp={};
                      }

                      idHolder=[];
                      for (obj in results){
                          idHolder[obj]=results[obj]["_id"];
                      }
                      console.log(req.session);
                      res.render('home', { test: req.session.firstName, keys:key, data:results} )
                  }
              });

      }
  });
});




router.post('/home', function(req,res, next){

    console.log("made it")

    console.log(req.params.id);

    var newObj = req.body;

    console.log(newObj);



    MongoClient.connect(url, function(err,db){
        if(err){
            throw err;
        }
        else{
            console.log("connection good");
            db.collection(collection).find().toArray(function(err,results){
                if(err){
                    throw err;
                }
                else{
                    console.log("collection good");
                    for(obj in results){
                        var oldObj = results[obj];
                        if(oldObj["_id"].equals(newObj["_id"])){
                            console.log("yay");

                            delete newObj["_id"];
                            console.log(newObj);

                            db.collection(collection).updateOne(oldObj,newObj,function(err,res){
                                if(err){
                                    throw err;
                                }
                                else{
                                    console.log("1 document updated");
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
