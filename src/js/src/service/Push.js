/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {
    'use strict';

    /**
    Manages push notification process for the umobile application.
    @submodule Push
    @namespace Push
    **/

    /**
    Method registers the authentificated user at first start
    @method init
    **/
    umobile.push.init = function() {

        if(umobile.app.stateModel.get('notification') === null) {
            umobile.push.register();
        }
    };

    /**
    Registers the device with the APNS (iOS) or GCM (Android) and the Unified Push server.
    @method register
    **/
    umobile.push.register = function() {

        var auth = umobile.app.stateModel.get('authenticated');
        
        if(auth !== false) {

            var username = umobile.app.credModel.get('username');

            var pushConfig = {
                // the location of the UnifiedPush server e.g. http(s)//host:port/context
                pushServerURL: "<pushServerURL e.g http(s)//host:port/context >",
                // Application specific alias to identify users with the system. Common use case would be an email address or a username.
                alias: "<alias e.g. a username or an email address optional>",
                android: {
                    // android specific - the id representing the Google project ID
                    senderID: "<senderID e.g Google Project ID only for android>",
                    // the id representing the mobile application variant
                    variantID: "<variantID e.g. 1234456-234320>",
                    // the secret for the mobile application variant
                    variantSecret: "<variantSecret e.g. 1234456-234320>"
                },
                ios: {
                    variantID: '<variantID e.g. 1234456-234320>',
                    variantSecret: '<variantSecret e.g. 1234456-234320>'
                }
            };

            try {

                push.register(
                    // onNotification callback
                    umobile.push.onNotification,
                    // successCallback
                    function(success) {
                        umobile.app.stateModel.set({notification : 'enabled'});
                        umobile.app.stateModel.save();
                    },
                    // errorCallback
                    function(error) {
                        console.log('error : ' + error);
                    },
                    // configuration
                    pushConfig);
            } catch (err) {
                txt = 'There was an error on this page.\n\n';
                txt += 'Error description: ' + err.message + '\n\n';
                alert(txt);
            }
        } else {
            alert('Vous devez vous connecter pour activer les notifications');
        }
    };

    /**
    Unregisters the device with the APNS (iOS) or GCM (Android) and the Unified Push server.
    @method unregister
    **/
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
            txt = 'There was an error on this page.\n\n';
            txt += 'Error description: ' + err.message + '\n\n';
            alert(txt);
        }
    };

    /**
    Method registers the authentificated user at first start
    @method onNotification
    **/
    umobile.push.onNotification = function(e) {

        console.log(e);
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if (e.foreground) {

            console.log('--INLINE NOTIFICATION--');
            // if the notification contains a soundname, play it.
            var myMedia = new Media('/android_asset/www/' + e.sound);
            myMedia.play();

        } else { // otherwise we were launched because the user touched a notification in the notification tray.

            if (e.coldstart) {
                console.log('--COLDSTART NOTIFICATION--');
            }
            else {
                console.log('--BACKGROUND NOTIFICATION--');
            }
        }
        
        umobile.push.storeNotification(e.alert);
        umobile.websocket.initConnection();
        // umobile.websocket.initScocketIo(notificationID);
    };

    /**
    Method store all received notifications.
    @method storeNotification
    **/
    umobile.push.storeNotification = function (message) {
        var date = new Date();
        
        var hours = date.getHours();
        if (hours<10) {
            hours = '0' + hours;
        }

        var minutes = date.getMinutes();
        if (minutes<10) {
            minutes = '0' + minutes;
        }

        var day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }

        var month = date.getMonth()+1;
        if(month < 10) {
            month = '0' + month;
        }

        var currentDate = day + '/' + month + '/' +date.getFullYear();
        var currentTime = hours + ':' + minutes;

        notification = new umobile.model.Notification({
            message: message,
            date: currentDate,
            time: currentTime
        });

        umobile.app.notificationCollection.push(notification);
        umobile.app.notificationCollection.save();
    };

    /**
    Method remove all notifications.
    @method remove
    **/
    umobile.push.remove = function () {

        // flush the notificationRegistry
        umobile.app.notificationCollection.reset();
        umobile.app.notificationCollection.save();
        umobile.app.router.navigate('dashboard', {trigger: true});
    };

})(jQuery, _, umobile, config);