/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the loaded Dashboard view.

	@class DashboardView
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.DashboardView = umobile.view.LoadedView.extend({
		/**
		Property houses the name of the loaded view.

		@property name
		@type String
		@override LoadedView
		**/
		name: 'dashboard',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-dashboardview',
			moduleList: '#moduleList',
			notifier: '#notifier'
		},

		/**
		Method empties root containers.

		@method cleanContainers
		**/
		cleanContainers: function () {
			var notifier = this.loc('notifier'),
				moduleList = this.loc('moduleList');

			notifier.empty().hide();
			moduleList.empty().hide();
		},

		/**
		Method renders modules.

		@method renderModules
		**/
		renderModules: function () {
			// Define & initialize.
			var moduleList = this.loc('moduleList'),
				modules = this.moduleCollection.toJSON();

			// Iterate over modules and initialize each module view.
			_.each(modules, function (module, idx) {
				console.log('mon module');
				console.log(module);
				console.log('mon idx');
				console.log(idx);
				var moduleView = new umobile.view.Module({
					model: module
				});
				moduleList.append(moduleView.render().el).show();
			}, this);
		},

		/**
		Method renders the notifier.

		@method renderNotifier
		**/
		renderNotifier: function () {
			// Define.
			var notifier, notifierModel, notifierView;

			// Initialize.
			notifier = this.loc('notifier');
			notifierModel = new umobile.model.Notifier();
			notifierView = new umobile.view.Notifier({model: notifierModel.toJSON()});
			notifier.append(notifierView.render().el).show();
		},

		/**
		Method overrides the LoadedView class. This method
		provides custom content for the Dashboard view.

		@method renderContent
		@param {Object} collection Reference to the ModuleCollection.
		@override LoadedView
		**/
		renderContent: function (collection) {
			this.cleanContainers();
			this.renderModules();
		},

		/**
		Method overrides the LoadedView class. This method
		provides custom content for the Dashboard view.

		@method renderError
		@override LoadedView
		**/
		renderError: function () {
			this.cleanContainers();
			this.renderNotifier();
		}
	});

})(jQuery, _, Backbone, umobile, config);