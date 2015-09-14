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
// routes.initialize(app);

// home page
app.get( '/', function( request, response ) {
        response.render('index', { title: 'Todo App'});
});

//Get a list of all todos that aren't completed
app.get( '/todos', function( request, response ) {
    return TodoModel.find({completed: false}, function( err, todos ) {
        if (err) return console.log(err);
        response.render('todos', {
          title: 'Todo List',
          todos: todos || []
        });
    });
});

//Get a list of all todos that are completed
app.get('/todos/completed', function(request, response) {
    return TodoModel.find({completed: true}, function( err, todos ) {
        if (err) return console.log(err);
        response.render('todos_completed', {
          title: 'Completed',
          todos: todos || []
        });
    });
});

//Insert a new todo
app.post( '/api/todos', function( request, response ) {
    var todo = new TodoModel({
        name: request.body.name,
    });

    return todo.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( book );
        } else {
            console.log( err );
        }
    });
});

// get a todo 
app.post('/todos/:todo_id', function(req, res) {
    return TodoModel.findById( request.params.id, function( err, todo ) {
        todo.completed = true;

        return todo.save( function( err ) {
            if( !err ) {
                console.log( 'todo updated' );
                return response.send( todo );
            } else {
                console.log( err );
            }
        });
    });
});

//Delete a book
app.delete( '/api/books/:id', function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return BookModel.findById( request.params.id, function( err, book ) {
        return book.remove( function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});



// view engine setup
app.set('port', process.env.PORT || 3300);
// app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
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
// mongoose.connect('mongodb://localhost/MyApp');
// mongoose.connection.on('open', function() {
//     console.log("Connected to Mongoose...");

//     // check if the db is empty, if so seed it with some contacts:
//     seeder.check();
// });

//Connect to database
mongoose.connect( 'mongodb://localhost/todolist_database' );

//Schemas
var Todo = new mongoose.Schema({
    name: String,
    completed: Boolean,
    createTime: Date
});

//Models
var TodoModel = mongoose.model( 'Todo', Todo );


// define app name
app.locals.appname = "Elaina's Todo App"

// boot up the server:
http.createServer(app).listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});