var app = app || {};


app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false,
        createTime: new Date()
    },
    

    validate: function(attributes) {
        var takenTitles = this.collection.models.map(function(model) { return model.attributes.title });
        takenTitles.pop();

        if (attributes.title == ""){
            return 'Please fill out title field.';
        }
        if (takenTitles.indexOf(attributes.title) >= 0) {
          debugger;
            return 'That todo has already been added to the list!';
        }
    },


// when we get the TodoModels from the server they have an _id attribute (with an underscore), but Backbone expects an id attribute (no underscore). Since no id attribute is present, Backbone sees this model as new and deleting a new model doesn’t need any synchronization.

// To fix this, we can use the parse function of Backbone.Model. The parse function lets you edit the server response before it is passed to the Model constructor. 

    parse: function( response ) {
      response.id = response._id;
      return response;
    }
});

