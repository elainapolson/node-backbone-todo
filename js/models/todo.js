var app = app || {};

app.Todo = Backbone.Model.extend({
    defaults: {
        name: '',
        completed: false,
        createTime: new Date()
    }
});

parse: function( response ) {
    response.id = response._id;
    return response;
}