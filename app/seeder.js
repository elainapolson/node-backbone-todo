// var mongoose = require('mongoose');
// var models = require('./models');

// module.exports = {
//     check: function() {
//         models.Todo.find({}, function(err, todos) {
//             if (todos.length === 0) {
//                 console.log('no todos found, seeding...');
//                 var newTodo = new models.Todo({
//                     name: 'Do dishes',
//                     completed: false
//                 });
//                 newTodo.save(function(err, todo) {
//                     console.log('successfully inserted todo: ' + todo._id);
//                 });

//                 newTodo = new models.Todo({
//                     name: 'Walk dog',
//                     completed: false
//                 });
//                 newTodo.save(function(err, todo) {
//                     console.log('successfully inserted todo: ' + todo._id);
//                 });

//                 newTodo = new models.Todo({
//                     name: 'Do Laundry',
//                     completed: false
//                 });
//                 newTodo.save(function(err, todo) {
//                     console.log('successfully inserted todo: ' + todo._id);
//                 });
//             } else {
//                 console.log('found ' + todos.length + ' existing todos!');
//             }
//         });
//     }
// };