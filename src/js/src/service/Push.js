/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {
    'use strict';

    umobile.push.init = function() {

        if(umobile.app.stateModel.get('notification') === null) {
            umobile.push.register();
        }
    };

    umobile.push.register = function() {
        
        var auth = umobile.app.stateModel.get('authenticated');
        
        if(auth !== false) {

            var username = umobile.app.credModel.get('username');

            var pushConfig = {
                pushServerURL: 'http://10.13.3.240:8080/ag-push/',
                alias: username,
                android: {
                  senderID: '1098358002481',
                  variantID: 'a860872b-3164-4564-ac0a-9c475aa019e8',
                  variantSecret: '4ffc21b9-d997-415d-bcfa-0f053418a4ce'
              },
              ios: {
                  variantID: '<variantID e.g. 1234456-234320>',
                  variantSecret: '<variantSecret e.g. 1234456-234320>'
              }
          };

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
            txt = 'There was an error on this page.\n\n';
            txt += 'Error description: ' + err.message + '\n\n';
            alert(txt);
        }
    } else {
        alert('Vous devez vous connecter pour activer les notifications');
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
        txt = 'There was an error on this page.\n\n';
        txt += 'Error description: ' + err.message + '\n\n';
        alert(txt);
    }
};

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

    umobile.push.remove = function () {

        // flush the notificationRegistry
        umobile.app.notificationCollection.reset();
        umobile.app.notificationCollection.save();
        umobile.app.router.navigate('dashboard', {trigger: true});
    };

})(jQuery, _, umobile, config);