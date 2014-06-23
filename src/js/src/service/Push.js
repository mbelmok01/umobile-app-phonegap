/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {

    

    umobile.push.init = function() {

        if(umobile.app.stateModel.get('notification') === null) {
            umobile.push.register();
        }
    };

    umobile.push.register = function() {
        var username = umobile.app.credModel.get('username');
        var pushConfig = {
            senderID: "23766181623",
            pushServerURL: "http://10.13.3.240:8080/ag-push/",
            variantID: "1d9b33fa-84d2-4fe3-96f7-b70470d5b548",
            variantSecret: "f5ead083-b219-40e6-944c-18ebf29dbd97",
            alias: username
        };

        if (umobile.app.stateModel.get('authenticated') === true)
        {
            try {

                push.register(
                    umobile.push.onNotification,

                    function(success) {
                        umobile.app.stateModel.set({notification : 'enabled'});
                        umobile.app.stateModel.save();
                    },

                    function(error) {
                        console.log('error : ' + error);
                    },

                    pushConfig);
            } catch (err) {
                txt = "There was an error on this page.\n\n";
                txt += "Error description: " + err.message + "\n\n";
                alert(txt);
            }
        }
    };

    umobile.push.unregister = function() {

        try {
            push.unregister(
                function(success) {
                    console.log('success : ' + success);
                    umobile.app.stateModel.set({notification : 'disabled'});
                    umobile.app.stateModel.save();
                },
                function(error) {
                    console.log('error : ' + error);
                }
            );
        } catch (err) {
            txt = "There was an error on this page.\n\n";
            txt += "Error description: " + err.message + "\n\n";
            alert(txt);
        }
    };

    umobile.push.onNotification = function(e) {

        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if (e.foreground) {

            console.log('--INLINE NOTIFICATION--');
            // if the notification contains a soundname, play it.
            // var my_media = new Media('/android_asset/www/' + e.sound);
            // my_media.play();
        } else {
            if (e.coldstart) {
                statusList.append("<li>--COLDSTART NOTIFICATION--" + "</li>");
            } else {
                console.log('--BACKGROUND NOTIFICATION--');
            }
            
            // only for iOS
            if (e.badge) {
                push.setApplicationIconBadgeNumber( function(success) {
                    console.log('success : ' + success);
                }, e.badge);
            }

            statusList.append("<li>MESSAGE -> MSG: " + e.alert + "</li>");
        }

        umobile.push.storeNotification(e.alert);
        umobile.websocket.initConnection();
        umobile.websocket.initScocketIo(notificationID);
    };

    umobile.push.storeNotification = function (message) {
        var date = new Date();
        var currentDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
        var currentTime = date.getHours() + ':' + date.getMinutes();

        notification = new umobile.model.Notification({
                message: message,
                date: currentDate,
                time: currentTime
            });
        
        umobile.app.notificationCollection.push(notification);
        umobile.app.notificationCollection.save();
    };

    umobile.push.remove = function () {
        
        // flush the notificationRegistry
        umobile.app.notificationCollection.reset();
        umobile.app.notificationCollection.save();
    };

})(jQuery, _, umobile, config);