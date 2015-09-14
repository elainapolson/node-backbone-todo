var app = app || {};

app.TodoView = Backbone.View.extend({
    tagName: 'div',
    className: 'todoContainer',
    template: _.template( $( '#todoTemplate' ).html() ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.attributes ) );

        return this;
    }
});

events: {
        'click .delete': 'deleteTodo'
    },

    deleteTodo: function() {
        //Delete model
        this.model.destroy();

        //Delete view
        this.remove();
    },