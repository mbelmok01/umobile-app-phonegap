/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, Handlebars:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	
	@class NotificationE
	@subnotification view
	@namespace view
	@constructor
	**/
	umobile.view.NotificationE = umobile.view.Base.extend({
		/**
		Property houses HTML tag name used to build view.

		@property tagName
		@type String
		**/
		tagName: 'div',
		

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-notificatione'
		}
	});

})(jQuery, _, umobile, config);