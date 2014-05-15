/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {

	//For iOS and Android registration

    var pushConfiguration = {
        pushServerURL: 'http://172.20.10.6:8080/ag-push/',
        android: {
            senderID: '585711183953',
            variantID: '57abd8ac-0f29-4a40-9864-9def4ec83d0f',
            variantSecret: 'bca4eef4-7816-43d0-99b7-5bb948fdf207'
        },
        // ios: {
        //   variantID: '<variantID e.g. 1234456-234320>',
        //   variantSecret: '<variantSecret e.g. 1234456-234320>'
        // }
    };
    
	umobile.push.init = function() {

        if(localStorage.getItem('notificationState') === null)
        {
            push.register(successHandler, errorHandler, {'ecb': 'onNotification', pushConfig: pushConfiguration});
        }
	};

    umobile.push.register = function() {
        push.register(successHandler, errorHandler, {'ecb': 'onNotification', pushConfig: pushConfiguration});
    };

    umobile.push.unregister = function() {
        push.unregister(successHandlerUnregister, errorHandlerUnregister);
    };
    
    var successHandler = function(data) {
        localStorage.setItem('notificationState', 'enabled');
        alert('Pushs notifications are now enabled');
        debug.info('Success : ' + data);
	};

	var errorHandler = function(err) {
        alert('Pushs notifications cannot be enabled cause of error');
        debug.info('error : ' + err);
	};

    var successHandlerUnregister = function(data) {
        localStorage.setItem('notificationState', 'disabled');
        alert('Pushs notifications are now disabled');
        debug.info('Success : ' + data);
    };

    var errorHandlerUnregister = function(err) {
        alert('Pushs notifications cannot be desabled cause of error');
        debug.info('error : ' + err);
    };

    var onNotification = function(e) {

        if (e.foreground) {

            debug.info('--INLINE NOTIFICATION--');
        }
        else {
            if (e.coldstart) {
                debug.info('--COLDSTART NOTIFICATION--');
            }
            else {
                debug.info('--BACKGROUND NOTIFICATION--');
            }
        }

        alert(e.alert);

        var ladate = new Date();
        var currentDate = ladate.getDate()+'/'+(ladate.getMonth()+1)+'/'+ladate.getFullYear();
        var currentTime = ladate.getHours() + ':' + ladate.getMinutes();
        
        umobile.push.addHistory(e.alert, e.data, e.badge, currentDate, currentTime);
    };

    umobile.push.addHistory = function (message, data, badge, date, time) {

        var currentHistory = JSON.parse(localStorage.getItem('NotificationHistory')) || [];
        if (! (currentHistory instanceof Array) ) {
            currentHistory = [];
        }

        var notification = {
            'message': message,
            'data': data,
            'badge': badge,
            'date': date,
            'time': time
        };

        currentHistory.push(notification);

        localStorage.setItem('NotificationHistory', JSON.stringify(currentHistory));
    };

    umobile.push.removeHistory = function () {
        localStorage.removeItem('NotificationHistory');
        currentHistory = null;
        umobile.push.displayHistory();
    };

    umobile.push.displayHistory = function () {

        if($(".notificationStyle").size() == 0) {

            var currentHistory = JSON.parse(localStorage.getItem('NotificationHistory')) || [];

            if (! (currentHistory instanceof Array) ) {
                    currentHistory = [];
            }

            for(var i =0; i < currentHistory.length; i++)
            {
                var notification = currentHistory[i];

                var iDiv = document.createElement('div');
                var ipara = document.createElement('p');
                var span = document.createElement('span');
                var seprateur = document.createElement('hr');
                iDiv.className = 'notificationStyle';
                ipara.className = 'paraStyle';
                span.className = 'spanStyle';
                ipara.innerHTML = notification.message;
                span.innerHTML = notification.time;
                iDiv.appendChild(span);
                iDiv.appendChild(ipara);
                document.getElementsByTagName('body')[0].appendChild(iDiv);
                document.getElementsByTagName('body')[0].appendChild(seprateur);
            }   
        }
    }

})(jQuery, _, umobile, config);