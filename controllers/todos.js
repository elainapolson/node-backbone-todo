var models = require('../app/models');

module.exports = {

    // list of all the todos that are not completed
    list: function(req, res, next){
      models.Todo.find({completed: false}, function(error, todos){
        if (error) return next(error);
        res.render('todos', {
          title: 'Todo List',
          todos: todos || []
        });
      });
    },

    // list of all the todos that are completed
    completed: function(req, res, next) {
      models.Todo.find({completed: true}, function(error, todos) {
        res.render('todos_completed', {
          title: 'Completed',
          todos: todos || []
        });
      });
    },

    // add a new todo to the list with completed - false
    add: function(req, res, next){
      if (!req.body || !req.body.name) return next(new Error('No data provided.'));
      var newTodo = new models.Todo(req.body);
      newTodo.save({
        name: req.body.name,
        createTime: new Date(),
        completed: false
      }, function(error, todo){
        if (error) return next(error);
        if (!todo) return next(new Error('Failed to save.'));
        console.info('Added %s with id=%s', todo.name, todo._id);
        res.redirect('/todos');
      })
    },
    // update: function(req, res) {
    //     console.log(req.body);
    //     models.Contact.update({ _id: req.body.id }, req.body, function(err, updated) {
    //         if (err) {
    //             res.json({error: 'Contact not found.'});
    //         } else {
    //             res.json(updated);
    //         }
    //     })
    // },

    
    // mark a todo as completed - change completed to true
    markCompleted: function(req, res, next) {
      // if (!req.body.completed) return next(new Error('Param is missing.'));
      debugger;
      var completed = req.body.completed === 'true';
      models.Todo.updateById(req.todo._id, {$set: {completeTime: completed ? new Date() : null, completed: completed}}, function(error, count) {
        if (error) return next(error);
        if (count !==1) return next(new Error('Something went wrong.'));
        console.info('Marked todo %s with id=%s completed.', req.todo.name, req.todo._id);
        res.redirect('/todos');
      })
    },


    del: function(req, res, next) {
      models.Todo.findOne({ _id: req.params.id }, function(err, todo) {
        if (error) return next(error);
        if (count !==1) return next(new Error('Something went wrong.'));
        console.info('Deleted todo %s with id=%s completed.', req.todo.name, req.todo._id);
        res.status(204).send();
      });
    }

};