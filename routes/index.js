var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Todo List App' });
});


/* GET todolist page. */
router.get('/todolist', function(req, res) {
    var db = req.db;
    var collection = db.get('todocollection');
    collection.find({},{},function(e,docs){
        res.render('todolist', {
            "todolist" : docs
        });
    });
});

/* GET New Todo page. */
router.get('/newtodo', function(req, res) {
    res.render('newtodo', { title: 'Add New Todo' });
});

/* POST to Add Todo Service */
router.post('/addtodo', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var todoName = req.body.todoname;
    var todoCompleted = req.body.todocompleted;

    // Set our collection
    var collection = db.get('todocollection');

    // Submit to the DB
    collection.insert({
        "name" : todoName,
        "completed" : todoCompleted
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("todolist");
        }
    });
});

module.exports = router;
