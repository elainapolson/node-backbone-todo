/*
 * GET users listing.
 */

// list of not completed todos
exports.list = function(req, res, next){
  req.db.todos.find({completed: false}).toArray(function(error, todos){
    if (error) return next(error);
    res.render('todos', {
      title: 'Todo List',
      todos: todos || []
    });
  });
};


// adding a todo 
exports.add = function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  req.db.todos.save({
    name: req.body.name,
    createTime: new Date(),
    completed: false
  }, function(error, todo){
    if (error) return next(error);
    if (!todo) return next(new Error('Failed to save.'));
    console.info('Added %s with id=%s', todo.name, todo._id);
    res.redirect('/todos');
  })
};


exports.completed = function(req, res, next) {
  req.db.todos.find({completed: true}).toArray(function(error, todos) {
    res.render('todos_completed', {
      title: 'Completed',
      todos: todos || []
    });
  });
};

debugger;
exports.markCompleted = function(req, res, next) {
  if (!req.body.completed) return next(new Error('Param is missing.'));
  var completed = req.body.completed === 'true';
  req.db.todos.updateById(req.todo._id, {$set: {completeTime: completed ? new Date() : null, completed: completed}}, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Marked todo %s with id=%s completed.', req.todo.name, req.todo._id);
    res.redirect('/todos');
  })
};

exports.del = function(req, res, next) {
  req.db.todos.removeById(req.todo._id, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Deleted todo %s with id=%s completed.', req.todo.name, req.todo._id);
    res.status(204).send();
  });
};