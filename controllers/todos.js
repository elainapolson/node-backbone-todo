// var models = require('../app/models');

// module.exports = {

//     // list of all the todos that are not completed
//     list: function(req, res, next){
//       models.Todo.find({completed: false}, function(error, todos){
//         if (error) return next(error);
//         res.render('todos', {
//           title: 'Todo List',
//           todos: todos || []
//         });
//       });
//     },

//     // list of all the todos that are completed
//     completed: function(req, res, next) {
//       models.Todo.find({completed: true}, function(error, todos) {
//         res.render('todos_completed', {
//           title: 'Completed',
//           todos: todos || []
//         });
//       });
//     },

//     // add a new todo to the list 
//     add: function(req, res, next){
//       var todo = new models.Todo({
//         name: req.name
//       });
//       todo.save(function(err) {
//         if (!err) {
//           return console.log("created");
//         }
//       });
//       res.render('todos');
//     },
    
//     // mark a todo as completed - change completed to true
//     markCompleted: function(req, res, next) {
//       var todo = models.Todo.findById(req.params.id);
//       todo.completed = true;

//       todo.save(function(err) {
//         if (!err) {
//           console.log("updated");
//         }
//       });
//       res.render('todos')
//     },


//     del: function(req, res, next) {
//       models.Todo.findOne({ _id: req.params.id }, function(err, todo) {
//         if (error) return next(error);
//         if (count !==1) return next(new Error('Something went wrong.'));
//         console.info('Deleted todo %s with id=%s completed.', req.todo.name, req.todo._id);
//         res.status(204).send();
//       });
//     }

// };



// // app.get('/api/todos', function(req, res){
// //   return Todo.find(function(err, todos) {
// //     return res.send(todos);
// //   });
// // });

// // app.get('/api/todos/:id', function(req, res){
// //   return Todo.findById(req.params.id, function(err, todo) {
// //     if (!err) {
// //       return res.send(todo);
// //     }
// //   });
// // });

// // app.put('/api/todos/:id', function(req, res){
// //   return Todo.findById(req.params.id, function(err, todo) {
// //     todo.text = req.body.text;
// //     todo.done = req.body.done;
// //     todo.order = req.body.order;
// //     return todo.save(function(err) {
// //       if (!err) {
// //         console.log("updated");
// //       }
// //       return res.send(todo);
// //     });
// //   });
// // });

// // app.post('/api/todos', function(req, res){
// //   var todo;
// //   todo = new Todo({
// //     text: req.body.text,
// //     done: req.body.done,
// //     order: req.body.order
// //   });
// //   todo.save(function(err) {
// //     if (!err) {
// //       return console.log("created");
// //     }
// //   });
// //   return res.send(todo);
// // });

// // app.delete('/api/todos/:id', function(req, res){
// //   return Todo.findById(req.params.id, function(err, todo) {
// //     return todo.remove(function(err) {
// //       if (!err) {
// //         console.log("removed");
// //         return res.send('')
// //       }
// //     });
// //   });
// // });