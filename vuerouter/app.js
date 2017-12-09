// Requires for build
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');//Logs requests - useful 
var bodyParser = require('body-parser');

// Routes required to access differnt endpoints - easier if used within variable as such
var book = require('./routes/book');
var user = require('./routes/user');
var system = require('./routes/system');

// app uses express as the server. Should be familiar.
var app = express();

// Mongoose client with bluebird. Not really sure what bluebird is but it works with the build
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mevn-stack', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// body parser to read json objects.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.set('view engine', 'html');//makes it so that express can render and user html files instead of pug


app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book);

//Setting up the User Endpoint
app.use('/users', express.static(path.join(__dirname, 'dist')));
app.use('/user', user);

//Setting up the Systems Endpoint
app.use('/systems', express.static(path.join(__dirname, 'dist')));
app.use('/system', system);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//export badboy back to html/webpage
module.exports = app;
