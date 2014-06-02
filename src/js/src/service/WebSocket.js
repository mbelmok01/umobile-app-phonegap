/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {

    umobile.websocket.initConnection = function() {

    	var socket = io.connect('http://localhost:8082');

    	socket.on('message', function(message) {
    		alert('Le serveur a un message pour vous : ' + message.content);
    	});
    };

})(jQuery, _, umobile, config);