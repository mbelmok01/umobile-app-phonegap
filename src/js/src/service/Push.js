/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {

    var PushConfig = {
        senderID: "903205907343",
        pushServerURL: "http://172.20.10.6:8080/ag-push/",
        variantID: "3e4f8fe8-085c-46a8-829b-4d2cca59aca8",
        variantSecret: "e758d04b-1636-42bb-ac5f-86e796c3cb75"
    }

    umobile.push.register = function() {
        push.register(
            function (result) {
                console.log("success: " + result);
            },
            
            function (error) {
                console.log("error: " + error);
            },
            
            {"ecb": "umobile.push.onNotification", pushConfig: PushConfig}
        );
    };

    umobile.push.unregister = function() {
        push.unregister(function (result) {
                console.log("success: " + result);
            },
            
            function (error) {
                console.log("error: " + error);
            });
    };

    umobile.push.onNotification = function(e) {
    
        
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if (e.foreground) {

            console.log('--INLINE NOTIFICATION--');
            // if the notification contains a soundname, play it.
            // var my_media = new Media("/android_asset/www/" + e.sound);
            // my_media.play();
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
        
        // localStorage.setItem("myMessage", e.alert);

        var ladate = new Date();
        var currentDate = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();
        var currentTime = ladate.getHours() + ":" + ladate.getMinutes();
        
        umobile.push.addHistory(e.alert, e.badge, currentDate, currentTime);

        
        console.log('MESSAGE -> MSG: ' + e.alert);
    };

    umobile.push.addHistory = function (message, badge, date, time) {

        var currentHistory = JSON.parse(localStorage.getItem("NotificationHistory")) || [];
        if (! (currentHistory instanceof Array) ) {
            currentHistory = [];
        }

        var notification = {
            "message": message,
            "badge": badge,
            "date": date,
            "time": time
        };

        currentHistory.push(notification);

        localStorage.setItem("NotificationHistory", JSON.stringify(currentHistory));
    };

    umobile.push.removeHistory = function () {
        localStorage.removeItem("NotificationHistory");
        currentHistory = null;
        umobile.push.displayHistory();
    };

    umobile.push.displayHistory = function () {

        if($(".notificationStyle").size() === 0) {

            var currentHistory = JSON.parse(localStorage.getItem("NotificationHistory")) || [];

            if (! (currentHistory instanceof Array) ) {
                    currentHistory = [];
            }

            for(var i =0; i < currentHistory.length; i++)
            {
                var notification = currentHistory[i];

                var iDiv = document.createElement("div");
                var ipara = document.createElement("p");
                var span = document.createElement("span");
                var seprateur = document.createElement("hr");
                iDiv.className = "notificationStyle";
                ipara.className = "paraStyle";
                span.className = "spanStyle";
                ipara.innerHTML = notification.message;
                span.innerHTML = notification.time;
                iDiv.appendChild(span);
                iDiv.appendChild(ipara);
                document.getElementsByTagName("body")[0].appendChild(iDiv);
                document.getElementsByTagName("body")[0].appendChild(seprateur);
            }
        }
    };

})(jQuery, _, umobile, config);