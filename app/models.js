var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Todo = new Schema({
    name:       { type: String },
    createTime: { type: Date },
    completed:  { type: Boolean }
});

module.exports = {
    Todo: mongoose.model('Todo', Todo)
};