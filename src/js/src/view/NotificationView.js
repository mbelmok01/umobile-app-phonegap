/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	umobile.view.NotificationView = umobile.view.SLoadedView.extend({


		name : 'notification',

		
		selectors: {
			template: '#views-partials-notificationsview',
			notificationList: '#notificationList'
		},

		
		cleanContainers: function () {
			// console.log('passage dans cleanContainers');

			var notificationList = this.loc('notificationList');

			notificationList.empty().hide();
		},

		
		renderNotifications: function () {
			// Define & initialize.
			var notificationList = this.loc('notificationList');
			var	notifications = umobile.app.notificationCollection.toJSON();
				
			// Iterate over notifications and initialize each notification.
			_.each(notifications, function (notification, idx) {
				var notificationView = new umobile.view.Notification({
					model : notification
				});
				notificationList.append(notificationView.render().$el).show();
			}, this);
		},

		
		renderContent: function (collection) {
			this.cleanContainers();
			this.renderNotifications();
		},

		
		renderError: function () {
			this.cleanContainers();
		}
	});

})(jQuery, _, Backbone, umobile, config);