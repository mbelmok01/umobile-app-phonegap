(function($, umobile, config) {

	/**
	The State model houses the state of a user's authentication status.

	@class State
	@constructor
	**/
	umobile.model.State = Backbone.Model.extend({
		/**
		The defaults hash is used to specify the default attributes.

		@property defaults
		@type Object
		**/
		defaults: {
			id: "state",
			authenticated: false,
			lastSessionAccess: null
		},

		/**
		Overrides Backbone.sync with umobile.storage.sync method.
		Persists the state of the model to the server.

		@method sync
		**/
		sync: umobile.storage.sync(umobile.storage[config.storageFn], 'state')
	});

})(jQuery, umobile, config);