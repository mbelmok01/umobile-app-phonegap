/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	umobile.view.NotificationView = umobile.view.SLoadedView.extend({
		/**
		Property houses the name of the loaded view.

		@property name
		@type String
		@override SLoadedView
		**/
		name : 'notification',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-notificationsview',
			notificationList: '#notificationList',
			buttonOn : '#buttonOn',
			buttonOff : '#buttonOff',
			buttonRemove : '#buttonRemove',
			notificationE: '#notificationE'
		},

		/**
		Property houses Backbone events object.

		@property events
		@type Object
		**/
		events: {
			'click #buttonOn' : 'setOnHandler',
			'click #buttonOff' : 'setOffHandler',
			'click #buttonRemove' : 'removeHandler'
		},

		setOnHandler: function () {

			umobile.push.register();
		},

		setOffHandler: function () {

			umobile.push.unregister();
		},

		removeHandler: function () {

			umobile.push.remove();
		},
		
		/**
		Method empties root containers.

		@method cleanContainers
		**/
		cleanContainers: function () {
			// console.log('passage dans cleanContainers');

			var notificationList = this.loc('notificationList');

			notificationList.empty().hide();
		},

		/**
		Method renders notifications.

		@method renderNotifications
		**/
		renderNotifications: function () {

			// Define & initialize.
			var notificationList = this.loc('notificationList');
			var notificationE = this.loc('notificationE');
			var	notifications = umobile.app.notificationCollection.toJSON();

			// console.log(notifications);
			console.log(umobile.app.notificationCollection.size());



			if(umobile.app.notificationCollection.size() > 0)
			{
				// Iterate over notifications and initialize each notification.
				_.each(notifications, function (notification, idx) {
					var Notification = new umobile.view.Notification({
						model : notification
					});
					notificationList.append(Notification.render().$el).show();
				}, this);
			} else {
				
				var NotificationE = new umobile.view.NotificationE();

				notificationE.append(NotificationE.render().$el).show();
			}
		},

		/**
		Method overrides the SLoadedView class. This method
		provides custom content for the Notification view.

		@method renderContent
		@param {Object} collection Reference to the NotificationCollection.
		@override SLoadedView
		**/
		renderContent: function (collection) {
			this.cleanContainers();
			this.renderNotifications();
		},

		/**
		Method overrides the SLoadedView class. This method
		provides custom content for the Notifications view.

		@method renderError
		@override SLoadedView
		**/
		renderError: function () {

			this.cleanContainers();
		}
	});

})(jQuery, _, Backbone, umobile, config);