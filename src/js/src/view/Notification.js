/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, Handlebars:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Manages the individual Module or portlet view.

	@class Module
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Notification = umobile.view.Base.extend({
		/**
		Property houses HTML tag name used to build view.

		@property tagName
		@type String
		**/
		tagName: 'li',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-notification'
		}
	});

})(jQuery, _, umobile, config);