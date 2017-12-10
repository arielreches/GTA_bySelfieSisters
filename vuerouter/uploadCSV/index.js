var app = require('express')();
var mongoose = require('mongoose');
 
var server = require('http').Server(app);
 
app.use(fileUpload());
 
server.listen(80);
 
mongoose.connect('mongodb://jhynes54:selfiesisters123@ds133876.mlab.com:33876/gtadatabase');
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
 
var template = require('./template.js');
app.get('/template', template.get);
 
var upload = require('./upload.js');
app.post('/', upload.post);