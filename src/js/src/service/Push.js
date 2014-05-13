/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {


	var pushConfiguration = {
		senderID: "234640161751",
		pushServerURL: "http://10.13.3.240:8080/ag-push/",
		variantID: "8da3b47f-3c53-4f62-8fca-db8cfe04e1c9",
		variantSecret: "8a8b09d3-7d79-4e0d-883f-1e62e5f4c682"
	};


	//For iOS and Android registration
	
	/**
	var pushConfiguration = {
		pushServerURL: "http://10.13.3.240:8080/ag-push/",
        android: {
        	senderID: "234640161751",
        	variantID: "8da3b47f-3c53-4f62-8fca-db8cfe04e1c9",
        	variantSecret: "8a8b09d3-7d79-4e0d-883f-1e62e5f4c682"
        },
        ios: {
          variantID: "<variantID e.g. 1234456-234320>",
          variantSecret: "<variantSecret e.g. 1234456-234320>"
        }
    };
    */

	umobile.push.init = function() {

        if(umobile.app.notifModel.get("status") == null)
        {
            push.register( successHandler, errorHandler, {"ecb": "onNotification", pushConfig: pushConfiguration});
        }
	};

    umobile.push.register = function() {
        push.register( successHandler, errorHandler, {"ecb": "onNotification", pushConfig: pushConfiguration});
    }
    umobile.push.unregister = function() {
        push.unregister(successHandlerUnregister, errorHandlerUnregister);
    };
    
    var successHandler = function(data) {
        umobile.app.notifModel.save({status: "enabled"});
        alert("Pushs notifications are now enabled");
        debug.info('Success : ' + data);
	};

	var errorHandler = function(err) {
        alert("Pushs notifications cannot be enabled cause of error");
        debug.info('error : ' + err);
	};

    var successHandlerUnregister = function(data) {
        umobile.app.notifModel.save({status: "desabled"});
        alert("Pushs notifications are now desabled");
        debug.info('Success : ' + data);
    };

    var errorHandlerUnregister = function(err) {
        alert("Pushs notifications cannot be desabled cause of error");
        debug.info('error : ' + err);
    };

	var onNotification = function(e) {
		if (e.foreground) {

            debug.info("--INLINE NOTIFICATION--");
            // if the notification contains a soundname, play it.
            // var myMedia = new Media("/android_asset/www/" + e.sound);
            // myMedia.play();
        }
        else {   // otherwise we were launched because the user touched a notification in the notification tray.
            if (e.coldstart) {
                // debug.info("--COLDSTART NOTIFICATION--");
            }
            else {
                // debug.info("--BACKGROUND NOTIFICATION--");
            }
        }

        debug.info(e.alert);
  	};


})(jQuery, _, umobile, config);