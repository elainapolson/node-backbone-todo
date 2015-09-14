var app = app || {};

app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false,
        createTime: new Date()
    },


// when we get the TodoModels from the server they have an _id attribute (with an underscore), but Backbone expects an id attribute (no underscore). Since no id attribute is present, Backbone sees this model as new and deleting a new model doesn’t need any synchronization.

// To fix this, we can use the parse function of Backbone.Model. The parse function lets you edit the server response before it is passed to the Model constructor. 

    parse: function( response ) {
      response.id = response._id;
      return response;
    }
});

