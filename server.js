// these are the module dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var application_root = __dirname

// creates server
var app = express();

//Connect to database
mongoose.connect( 'mongodb://localhost/todolist_db' );

//Schemas

var Todo = new mongoose.Schema({
  title: String,
  completed: Boolean,
  createTime: Date
});

//Models
var TodoModel = mongoose.model( 'Todo', Todo );

// express js middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( express.static( path.join( application_root, 'site') ) );

// define app name
app.locals.appname = "Elaina's Todo App"
// date library for parsing, validating, manipulating, and formatting dates.
app.locals.moment = require('moment');

// Routes
app.get( '/api', function( request, response ) {
  response.send( 'TodoList API is running' );
});

//Get a list of all completed todos
app.get( '/api/todos', function( request, response ) {
  return TodoModel.find({completed: false}, function( err, todos ) {
    if( !err ) {
      return response.send( todos );
    } else {
      return console.log( err );
    }
  });
});

//Get a list of all completed todos
app.get( '/api/todos/completed', function( request, response ) {
  return TodoModel.findById({completed: true}, function( err, todo ) {
    if( !err ) {
      return response.send( todos );
    } else {
      return console.log( err );
    }
  });
});

//Insert a new todo
app.post( '/api/todos', function( request, response ) {
  var todo = new TodoModel({
    title: request.body.title,
    completed: false,
    createTime: new Date
  });
  todo.save( function( err ) {
    if( !err ) {
      return console.log( 'created' );
    } else {
      return console.log( err );
    }
    return response.send( todo );
  });
});

//Update a todo to complete
app.put( '/api/todos/:id', function( request, response ) {
  console.log( 'Updating todo ' + request.body.title );
  return TodoModel.findById( request.params.id, function( err, todo ) {
    todo.completed = true;

    return todo.save( function( err ) {
      if( !err ) {
        console.log( 'book updated' );
      } else {
        console.log( err );
      }
      return response.send( todo );
    });
  });
});

//Delete a book
app.delete( '/api/todos/:id', function( request, response ) {
  console.log( 'Deleting todo with id: ' + request.params.id );
  return TodoModel.findById( request.params.id, function( err, todo ) {
    return todo.remove( function( err ) {
      if( !err ) {
        console.log( 'Todo removed' );
        return response.send( '' );
      } else {
        console.log( err );
      }
    });
  });
});

// boot up the server:
var port = 3300;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});



