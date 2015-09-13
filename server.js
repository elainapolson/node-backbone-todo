var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var seeder = require('./app/seeder');
var mongoose = require('mongoose');
var routes = require('./app/routes');

var app = express();

//routes list:
routes.initialize(app);

// view engine setup
app.set('port', process.env.PORT || 3300);
app.set('views', path.join(__dirname, 'views'));
// app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// express js middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// date library for parsing, validating, manipulating, and formatting dates.
app.locals.moment = require('moment');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//connect to the db server:
mongoose.connect('mongodb://localhost/MyApp');
mongoose.connection.on('open', function() {
    console.log("Connected to Mongoose...");

    // check if the db is empty, if so seed it with some contacts:
    seeder.check();
});

// define app name
app.locals.appname = "Elaina's Todo App"

// boot up the server:
http.createServer(app).listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});