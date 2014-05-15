/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	The Module model houses information relating to each
	module or portlet.

	@class Module
	@submodule model
	@namespace model
	@constructor
	**/

	

	umobile.model.Notification = Backbone.Model.extend({
		/**
		Property houses default model attributes.

		@property defaults
		@type Object
		**/
		defaults: {
			message: null,
			data : null,
			badge: null,
			date : null,
			time : null
		},

		/**
		Method overrides Backbone.sync with umobile.storage.sync method.
		Persists the state of the model to the server.

		@method sync
		**/
		sync: umobile.storage.sync(umobile.storage[config.storageFn], 'notification')
	});

})(jQuery, _, umobile, config);