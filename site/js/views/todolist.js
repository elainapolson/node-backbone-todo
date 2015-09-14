var app = app || {};

app.TodolistView = Backbone.View.extend({
    el: '#todos',

    initialize: function() {
        this.collection = new app.Todolist();
        this.collection.fetch({reset: true});
        this.render();

        // make the view render again when a new model is added
        this.listenTo( this.collection, 'add', this.renderTodo );
        this.listenTo( this.collection, 'reset', this.render );
    },

    events:{
    'click #add':'addTodo'
    },

    addTodo: function( e ) {
        e.preventDefault();

        var formData = {};

        $( '#addTodo div' ).children( 'input' ).each( function( i, el ) {
            if( $( el ).val() != '' )
            {
                formData[ el.id ] = $( el ).val();
            }
        });

        this.collection.add( new app.Todo( formData ) );
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderTodo( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderTodo: function( item ) {
        var todoView = new app.TodoView({
            model: item
        });
        this.$el.append( todoView.render().el );
    }
});

