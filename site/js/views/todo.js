var app = app || {};

app.TodoView = Backbone.View.extend({
    tagName: 'div',
    className: 'todoContainer',
    template: _.template( $( '#todoTemplate' ).html() ),

    events: {
    'click .delete': 'deleteTodo',
    'click .complete': 'completeTodo'
    },

    deleteTodo: function() {
      //Delete model
      this.model.destroy();

      //Delete view
      this.remove();
    },

    // this isn't working right now... when refresh the page, it goes back to false
    completeTodo: function() {

      this.model.attributes.completed = true
      this.model.save;
      this.render();

    },

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.attributes ) );

        return this;
    }
});