var app = app || {};

app.Todolist = Backbone.Collection.extend({
    model: app.Todo,
    url: '/api/todos'
});