var app = app || {};

app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false,
        createTime: new Date()
    }
});

