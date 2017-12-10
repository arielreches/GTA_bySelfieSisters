//json file that uploads the CSV and populates it to /system
var csv = require('fast-csv') // csv parsing module
var mongoose = require('mongoose') // we know what this is
var System = require('./models/System') //system Schema

exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    
    var csvFile = req.files.file;

    var systems = [];

    csv
     .fromString(csvFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();

         systems.push(data);
     })
     .on("end", function(){
         System.create(systems,function(err,documents) {
             if (err) throw err;
         });
         
         res.send(systems.length + 'systems have been successfully uploaded.');
     });
};