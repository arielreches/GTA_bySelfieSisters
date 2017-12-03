var express = require("express");
var app = express();

var MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.set("view engine","pug");

//change these values to reflect your environment
var url = "mongodb://localhost:27017/mydb";
var collection="TheThingThatContainsAllOfTheImportantCSV_Stuff";
var port=3000;



MongoClient.connect(url, function(err, db){
    if(err){
        console.log("front end: connection error");
        throw err;
    }
    //if we're connected to the database...
    else{
        console.log("front end: connection success");

        //start up the web app on port 3000
        app.listen(port,function(){
            console.log("listening on: "+port);
        });


        app.get("/",function(req, res){
            db.collection(collection).find().toArray(function(err, results) {
                if(err){
                    console.log("front end: collection error");
                    throw err;
                }
                else{
                    console.log("front end: collection good");


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
                    // console.log(idHolder);
                    res.render('index', { title: 'Hey', keys:key, data:results})
                }
            });
        });
    }
});


app.post("/addTag",function(req,res){
    console.log("made it add tag");
    newTagName = req.body["newTagName"];
    console.log(newTagName);

    if(newTagName==""){
        console.log("unput can't be nothing")
        res.redirect('http://localhost:'+port);
    }
    else{
        addTagFunc(newTagName,res);
    }
})

function addTagFunc(newTagName,res){
    MongoClient.connect(url,function(err,db){
        if(err){
            throw err;
        }
        else{
            console.log("add tag connection good");
            db.collection(collection).find().toArray(function(err, results){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("add tag collection good");

                    for(obj in results){
                        old=results[obj];
                        var update = Object.assign({}, old);
                        delete update["_id"];
                        update[newTagName]=""

                        db.collection(collection).updateOne(old,update,function(err,res){
                            if(err){
                                throw err;
                            }
                            else{
                                console.log("tag added to database")
                            }
                        })
                    }
                }
            })
        }
    })
    res.redirect('http://localhost:'+port);
}

app.post("/", function(req,res){

    console.log("made it update tag");
    var newObj = req.body;
    console.log(newObj);

    MongoClient.connect(url, function(err,db){
        if(err){
            throw err;
        }
        else{
            console.log("update tag: connection good");
            db.collection(collection).find().toArray(function(err,results){
                if(err){
                    throw err;
                }
                else{
                    console.log("update tag: collection good");
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
                                    console.log("1 tag updated");
                                }
                            })

                        }
                        else{
                            // console.log("no");
                        }
                    }
                }
            })
            
        }
    })
    res.redirect('http://localhost:'+port);
})