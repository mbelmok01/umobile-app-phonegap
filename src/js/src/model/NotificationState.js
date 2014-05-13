/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	The State model houses the state of a notifications push status.

	@class State
	@submodule model
	@namespace model
	@constructor
	**/
	umobile.model.NotificationState = Backbone.Model.extend({
		/**
		Property houses default model attributes.

		@property defaults
		@type Object
		**/
		defaults: {
			id: 'notifications',
			status: null
		},

		/**
		Method overrides Backbone.sync with umobile.storage.sync method.
		Persists the state of the model to the server.

		@method sync
		**/
		sync: umobile.storage.sync(umobile.storage[config.storageFn], 'notifications')
	});

})(jQuery, _, umobile, config);