/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, Handlebars:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the application Notification.

	@class Notification
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.NotificationView = umobile.view.LoadedView.extend({
		/**
		Property houses the name of the loaded view.

		@property name
		@type String
		@override LoadedView
		**/
		name: 'notification',

		/**
		Property houses DOM selectors.


		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-notificationview',
			refresh : '#refreshButton'
		},

		events: {
			'click #refreshButton': 'displayNotifications',
			'click #removeButton': 'removeHandler',
			'click #setOnButton': 'setOnHandler',
			'click #setOffButton': 'setOffHandler',
		},

		setOnHandler: function () {
			umobile.push.register();
		},

		setOffHandler: function () {
			umobile.push.unregister();
		},

		removeHandler: function () {
			umobile.push.remove();
			this.displayNotifications();
		},


		displayNotifications: function () {

			this.collection = umobile.app.notificationCollection;
			
			$('#notificationArea').remove();

			var notificationArea = document.createElement('div');
			notificationArea.id = 'notificationArea';
			notificationArea.className = 'um-notification-area';

			$('#views-partials-notificationview').append(notificationArea);
			
			this.collection.each(function(model) {
				var div = document.createElement('div');
		        var span = document.createElement('span');
		        var para = document.createElement('p');
		        var seprateur = document.createElement('hr');
		        
		        span.innerHTML = 'Recu le ' + model.attributes.date + ' à ' + model.attributes.time;
		        para.innerHTML = model.attributes.message;

		        div.appendChild(span);
		        div.appendChild(para);
		        div.appendChild(seprateur);

		        $('#notificationArea').append(div);
			});
		},

		/**
		Method is triggered when the route changes.

		@method onRouteChanged
		@override Base
		**/
		onRouteChanged: function (view) {
			this.currentRoute = view.name;
			this.toggleVisibility();
		}
	});

})(jQuery, _, Backbone, umobile, config);