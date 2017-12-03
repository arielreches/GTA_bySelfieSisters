const fs = require('fs')
var parse = require('csv-parse')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

//this seems to read the file
fs.readFile("exampledata.csv", function (err, bytes, buffer) {
    if(err){
        //if error, cry and try again
        console.log("read error");
        return;
    }
    else{
        parse(bytes, {delimiter: ","}, function(err, rows ) {
            
            //if the parser failed...
            if(err){
                console.log("parser error");
                throw err;
            }
            console.log("made it: parser");

            //at this point we have parsed our csv file into a dictionary of arrays
            //row[0] is the array of keys. capture it
            var keys = rows[0];

            //need to do some processing on the keys. need to remove the periods.
            for(var i in keys){
                //regular expressions you are bae
                keys[i]=keys[i].replace(/\./g,"_");
            }

            //connect to the database
            MongoClient.connect(url, function(err, db) {
                if (err){
                    //if fail. give up
                    console.log("mongo connection error")
                    throw err;
                }
                else{
                    //for my peace of mind
                    console.log("made it: mongo");

                    //creates the new dictionary object
                    var myobj = {};

                    //loop through the csv file from index 1 because index 0 contains the keys
                    for(var i = 1 ; i < rows.length ; i++){

                        //capture the array of values
                        var other = rows[i];

                        //loop through the keys. remember that there is a one to one correspondence between values and keys
                        for(var j in keys){
                            //for every new key, add its corresponding value
                            myobj[keys[j]] = other[j];
                        }

                        //by this time we have our data properly formated in to a dictionary for passing into the database
                        db.collection("TheThingThatContainsAllOfTheImportantCSV_Stuff").insertOne(myobj, function(err, res) {
                            if (err){
                                //if fail, give up
                                console.log("Give the fuck up")
                                throw err;
                            }
                            else{
                                //give an encouraging message
                                console.log("VAMOS. BOOMSHAKALAKA");
                                db.close();
                            }
                        });
                        //once inserted, we need to clear the collection for the next set of data.
                        myobj = {};
                    }
                }
            });
        })
    }
})