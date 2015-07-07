var $ = require("jquery"),
    _ = require('lodash'),
	config = require('../../../gulp/config.js').app;

window.app = window.app || {};
module.exports = window.app.toolkit = {
    flip: function(obj) {
        // Swap object keys and values in Javascript
        // http://nelsonwells.net/2011/10/swap-object-key-and-values-in-javascript/     
        var new_obj = {};

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                new_obj[obj[prop]] = prop;
            }
        }
        return new_obj;
    },
    isSmall: function() {
        var mobile_mq = 'only screen and (max-width: '+config.breakpoints.small+'px)';
        return Modernizr.mq(mobile_mq);
    },
    isMedium: function() {
        var mobile_mq = 'only screen and (max-width: '+config.breakpoints.medium+'px) and (min-width: '+config.breakpoints.small+'px)';
        return Modernizr.mq(mobile_mq);
    },
    isLarge: function() {
        var mobile_mq = 'only screen and (min-width: '+config.breakpoints.large+'px)';
        return Modernizr.mq(mobile_mq);
    },
    getMaxWidth: function() {
        //max desktop width
        return 1440;
    },
    disableEventsOnScroll: function() {
        //https://github.com/ryanseddon/60fps-scroll/blob/master/dist/60fps-scroll.js
        var scrollStarted = false,
            timer;

        if (typeof document.addEventListener !== 'function') {
            return;
        }

        window.addEventListener('scroll', _.throttle(listen, 500, false));

        function listen() {
            if (!scrollStarted) {
                document.body.style.pointerEvents = 'none';
                scrollStarted = true;
            }
            clearTimeout(timer);

            timer = setTimeout(function() {
                document.body.style.pointerEvents = 'auto';
                scrollStarted = false;
            }, 500);
        }
    }
};