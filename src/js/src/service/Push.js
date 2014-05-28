/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {

    umobile.push.init = function() {

        if(umobile.app.stateModel.get('notification') === null)
        {
            umobile.push.register();   
        }
    };

    umobile.push.register = function() {
        var pushConfig = {
                senderID: '560741818531',
                pushServerURL: 'http://10.13.3.240:8080/ag-push/',
                variantID: '6423790e-74a9-426e-b5f3-649a9745c026',
                variantSecret: 'c1842770-ebcd-45bf-b7c5-b83a00de1bc8'
            }
                        
            push.register(umobile.push.successRegister, umobile.push.errorHandler, {'ecb': 'umobile.push.onNotification', pushConfig: pushConfig});
    };

    umobile.push.unregister = function() {
        
        push.unregister(umobile.push.successUnregister, umobile.push.errorHandler);
    };

    umobile.push.successRegister = function (success) {
        debug.info('success: ' + success);
        umobile.app.stateModel.set({notification : 'enabled'});
        umobile.app.stateModel.save();
    };

    umobile.push.successUnregister = function (success) {
        debug.info('success: ' + success);
        umobile.app.stateModel.set({notification : 'disabled'});
        umobile.app.stateModel.save();
    };

    umobile.push.errorHandler = function (error) {
        debug.info('success: ' + error);
    };

    umobile.push.onNotification = function(e) {

        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if (e.foreground) {

            console.log('--INLINE NOTIFICATION--');
            // if the notification contains a soundname, play it.
            var my_media = new Media('/android_asset/www/' + e.sound);
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

        console.log('MESSAGE -> MSG: ' + e.alert);

        umobile.push.storeNotification(e.alert);
    };

    umobile.push.storeNotification = function (message, date, time) {

    var date = new Date();
    var currentDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    var currentTime = date.getHours() + ':' + date.getMinutes();
        
        notification = new umobile.model.Notification(
            {
                message: message,
                date: currentDate,
                time: currentTime
            }
        );
        
        umobile.app.notificationCollection.push(notification);
        umobile.app.notificationCollection.save();

    };

    umobile.push.remove = function () {
        
        // flush the notificationRegistry
        umobile.app.notificationCollection.reset();
        umobile.app.notificationCollection.save();
        umobile.push.get();
    };

    umobile.push.get = function () {

        umobile.push.display(umobile.app.notificationCollection);
    };

    umobile.push.display = function (notificationCollection) {

        $('#notificationArea').remove();

        var notificationArea = document.createElement("div");
        notificationArea.id = "notificationArea";
        notificationArea.className = "um-notification-area";

        $("#view").append(notificationArea);

        // for each notification
        for(var i =0; i < notificationCollection.length; i++)
        {
            var notification = notificationCollection.models[i];
            console.log(notification);
            // creates a div element witch contains a span (date et time) and a paragraph (message of the notification)
            var div = document.createElement('div');
            var span = document.createElement('span');
            var para = document.createElement('p');
            var seprateur = document.createElement('hr');
            
            span.innerHTML = 'Recu le '+notification.attributes.date+ ' a '+notification.attributes.time;
            para.innerHTML = notification.attributes.message;

            div.appendChild(span);
            div.appendChild(para);
            div.appendChild(seprateur);

            document.getElementById('notificationArea').appendChild(div);
        }
    };


})(jQuery, _, umobile, config);