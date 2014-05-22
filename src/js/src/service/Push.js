/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {

    umobile.push.register = function() {

        var pushConfig = {
                senderID: "560741818531",
                pushServerURL: "http://172.20.10.6:8080/ag-push/",
                variantID: "6423790e-74a9-426e-b5f3-649a9745c026",
                variantSecret: "c1842770-ebcd-45bf-b7c5-b83a00de1bc8"
                }
                        
            push.register(umobile.push.successHandler, umobile.push.errorHandler, {"ecb": "umobile.push.onNotification", pushConfig: pushConfig});
    };

    umobile.push.onNotification = function(e) {

        alert("Passage dans la fonction onNotification");
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if (e.foreground) {

            console.log('--INLINE NOTIFICATION--');
            // if the notification contains a soundname, play it.
            var my_media = new Media("/android_asset/www/" + e.sound);
            my_media.play();
        }
        else {   // otherwise we were launched because the user touched a notification in the notification tray.
            if (e.coldstart) {
                console.log('--COLDSTART NOTIFICATION--');
            }
            else {
                console.log('--BACKGROUND NOTIFICATION--');
            }
        }

        //only on ios
        if (e.badge) {
          push.setApplicationIconBadgeNumber(successHandler, e.badge);
        }
        
        localStorage.setItem("myMessage", e.alert);
        
        console.log('MESSAGE -> MSG: ' + e.alert);
    };

    umobile.push.successHandler = function (success) {
        console.log('error: ' + success);
        debug.info('success: ' + success);
        alert('error: ' + success);
    };

    umobile.push.errorHandler = function (error) {
        console.log('error: ' + error);
        debug.info('success: ' + error);
        alert('error: ' + error);
    };


    umobile.push.unregister = function() {
        
        push.unregister(function (result) {
            debug.info('success: ' +date +' ' +  result);
            console.log("success: " + date +' ' + result);
        },

        function (error) {
            debug.info('success: ' +date +' ' +  result);
            console.log("error: " + date +' ' + error);
        });
    };

    umobile.push.storeNotification = function (message) {

        
        notification = new umobile.model.Notification({message: message});
        
        umobile.app.notificationCollection.push(notification);
        umobile.app.notificationCollection.save();

    };

    umobile.push.get = function () {

        // var currentHistory = JSON.parse(localStorage.getItem("notificationRegistry")) || [];
        var currentHistory = JSON.parse(localStorage.getItem("NotificationRegistry")) || [];

        if (! (currentHistory instanceof Array) ) {
            currentHistory = [];
        }
        umobile.push.display(currentHistory);
    };






})(jQuery, _, umobile, config);