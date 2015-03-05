App = Ember.Application.create();


App.Router.map(function() {
  // put your routes here
  this.resource('home');

  // routes are dead ends, you use routes to usually specify a piece of UI
  // resources are used to get data and nest other routes

  /*
	NOTE: If you define a resource using this.resource and do not supply a function, then the implicit resource.index route is not created. In that case, /resource will only use the ResourceRoute, ResourceCointroller, and resource template.
  */
  this.resource('posts', function(){

        this.resource('post', {path: '/:post_id'})

  });


});

App.ApplicationAdapter = DS.RESTAdapter.extend({

	host: "http://localhost:3000"

});

App.ApplicationSerializer = DS.JSONSerializer.extend({
  normalizePayload: function(payload) {
  	// console.log('PAYLOAD', payload);
    	return payload;
  }
});


App.Post = DS.Model.extend({

	title: DS.attr('string'),
	author: DS.attr('string'),
	intro: DS.attr('string'),
	extended: DS.attr('string')

});

App.IndexRoute = Ember.Route.extend({

	model: function() {

		return ['red', 'yellow', 'blue'];

	}

});

App.PostsRoute = Ember.Route.extend({

	model: function(){

		return this.store.find('post');

	}

});

App.PostRoute = Ember.Route.extend({

	model: function(params) {

		return this.store.find('post', params.post_id);

	}

});

App.PostController = Ember.ObjectController.extend({

	isEditing: false,

	actions: {
		edit: function(){

			this.set('isEditing', true)

		},

		doneEditing: function(){

			this.set('isEditing', false);
			/*console.log('PARAMS', this.store.find('post'))*/
			/*var post = this.store.find('post', params);
			post.save();*/
			console.log(this.get('model'))
			this.get('model').save();

		}
	}


});