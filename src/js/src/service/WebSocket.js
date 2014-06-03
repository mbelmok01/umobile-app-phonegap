/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {

		// umobile.websocket.loadScript = function (url, callback) {
		umobile.websocket.loadScript = function (url) {
		    var head = document.getElementsByTagName('head')[0];
		    var script = document.createElement('script');
		    script.type = 'text/javascript';
		    script.src = url;
		    // script.onload = callback;
		    head.appendChild(script);
		};

		umobile.websocket.initScocketIo = function (notificationID) {

			// socket connexion
			serverUri = 'http://10.13.3.240:8082';
			var socket = io.connect(serverUri);

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

		umobile.websocket.initConnection = function() {
		// load socket.io after all cordova plugins are loaded
		// umobile.websocket.loadScript('js/lib/socket.io/socket.io.js', umobile.websocket.initScocketIo);
		umobile.websocket.loadScript('js/lib/socket.io/socket.io.js');
	};

})(jQuery, _, umobile, config);