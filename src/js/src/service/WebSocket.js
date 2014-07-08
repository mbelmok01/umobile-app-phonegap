/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {

	'use strict';

		// umobile.websocket.loadScript = function (url)

		// umobile.websocket.loadScript = function (url, callback) {
		//     var head = document.getElementsByTagName('head')[0];
		//     var script = document.createElement('script');
		//     script.type = 'text/javascript';
		//     script.src = url;
		//     // script.onload = callback;
		//     head.appendChild(script);
		// };

		/**
		Method opens a socketIo channel to send an acknowledgement of receipt.
		@method initScocketIo
		**/

		umobile.websocket.initScocketIo = function (notificationID) {

			// socket connexion
			var socket = io.connect("http://url:port");

			socket.on('message', function(message) {
                alert('Le serveur a un message pour vous : ' + message);
            });

			// phone informations
			var informations = {
				phoneName : device.name,
				devicePlatform: device.platform,
				deviceVersion : device.version,
				deviceUUID : device.uuid,
				notificationID : "notificationID"
			};
			
			socket.emit('informations', informations);

			// Display a dialog box when user receives a 'message' signal from the server
			socket.on('message', function(message) {
				alert('The serveur has a message for you : ' + message);
			});

			
		};

		/**
		Method loads scripts 
		@method initConnection
		**/
		umobile.websocket.initConnection = function() {
		// load socket.io after all cordova plugins are loaded
		// umobile.websocket.loadScript('js/lib/socket.io/socket.io.js', umobile.websocket.initScocketIo);
		// umobile.websocket.loadScript('js/lib/socket.io/socket.io.js');
		umobile.utility.Utils.loadScript('js/lib/socket.io/socket.io.js', umobile.websocket.initScocketIo);
	};

})(jQuery, _, umobile, config);