/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {

    umobile.push.register = function() {

        var pushConfig = {
            senderID: "974817829387",
            pushServerURL: "http://192.168.0.36:8080/ag-push/",
            variantID: "83a837f9-d00b-4fae-9217-1e6b120774ea",
            variantSecret: "11f594bd-d634-444f-8ed8-899c84a54826",
            alias: "Mohamed"
        };


        var statusList = $("body");
        statusList.append('<li>deviceready event received</li>');

        try {
            statusList.append('<li>registering </li>');
            console.log(pushConfig);
            push.register(umobile.push.onNotification, umobile.push.successHandler, umobile.push.errorHandler, pushConfig);
        } catch (err) {
          txt = "There was an error on this page.\n\n";
          txt += "Error description: " + err.message + "\n\n";
          alert(txt);
        }
    };

    umobile.push.onNotification = function (e) {
    
        console.log('entree dans onNotification');
        var statusList = $("body");

        // on android we could play the sound, if we add the Media plugin
        if (e.sound && (typeof Media != 'undefined')) {
            var media = new Media("/android_asset/www/" + e.sound + '.wav');
            media.play();
        }

        if (e.coldstart) {
            statusList.append('<li>--COLDSTART NOTIFICATION--' + '</li>');
        }

        statusList.append('<li>MESSAGE -> MSG: ' + e.alert + '</li>');

        //only on ios
        if (e.badge) {
            push.setApplicationIconBadgeNumber(successHandler, e.badge);
        }
    };

    umobile.push.successHandler = function (success) {
        $("body").append('<li>success : ' + success + '</li>');
    };

    umobile.push.errorHandler = function (error) {
        $("body").append('<li>error : ' + error + '</li>');
    };
    
})(jQuery, _, umobile, config);