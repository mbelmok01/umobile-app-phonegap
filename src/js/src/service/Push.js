/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {

    
    umobile.push.init = function() {

        if(umobile.app.stateModel.get('notification') === null)
        {
            umobile.push.register();
        }
    };

    umobile.push.register = function() {

        var username = umobile.app.credModel.get('username');
        var pushConfig = {
            senderID: "974817829387",
            pushServerURL: "http://10.13.3.240:8080/ag-push/",
            variantID: "83a837f9-d00b-4fae-9217-1e6b120774ea",
            variantSecret: "11f594bd-d634-444f-8ed8-899c84a54826",
            alias: username
        };

        try {

            push.register(onNotification, successHandler, errorHandler, pushConfig);
        } catch (err) {
            txt = "There was an error on this page.\n\n";
            txt += "Error description: " + err.message + "\n\n";
            alert(txt);
        }
    };

    umobile.push.unregister = function() {
        
        push.unregister(successUnregister, errorHandler);
    };

    function successHandler() {
        $("body").append('<li>success</li>');
    }

    function errorHandler(error) {
        $("body").append('<li>error:' + error + '</li>');
    }

    function onNotification(e) {
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
    }


})(jQuery, _, umobile, config);