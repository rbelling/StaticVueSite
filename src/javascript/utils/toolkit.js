var $ = require("npm-zepto"),
    _ = require('lodash'),
    config = require('../../../gulp/config.js').app;

var Modernizr = Modernizr || window.Modernizr;
var Toolkit = (function() {
    var isSmall = function() {
        var mobile_mq = 'only screen and (max-width: ' + config.breakpoints.small + 'px)';
        return Modernizr.mq(mobile_mq);
    };
    var isMedium = function() {
        var mobile_mq = 'only screen and (max-width: ' + config.breakpoints.medium + 'px) and (min-width: ' + config.breakpoints.small + 'px)';
        return Modernizr.mq(mobile_mq);
    };
    var isLarge = function() {
        var mobile_mq = 'only screen and (min-width: ' + config.breakpoints.medium + 'px)';
        return Modernizr.mq(mobile_mq);
    };
    var toggleViewportClassname = function() {
        $('body').removeClass('is-large is-medium is-small');
        if (window) {
            if (window.app.toolkit.isLarge()) {
                $('body').addClass("is-large");
            } else
            if (window.app.toolkit.isMedium()) {
                $('body').addClass("is-medium");
            } else
            if (window.app.toolkit.isSmall()) {
                $('body').addClass("is-small");
            } else {
                console.warn('unhandled scenario');
            }
        }
    };
    var disableEventsOnScroll = function() {
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
    };
    var getDistance = function(a, b) {
        //computes the positive distance between two points using Pythagoras' Theorem
        //each variable is an object with x and y
        var horizontal = (a.x - b.x);
        var vertical = (a.y - b.y);
        var diagonal = Math.sqrt(Math.pow(horizontal, 2) + Math.pow(vertical, 2));

        return diagonal;
    };
    var getAngle = function(a, b, quadrant) {
        //computes the angle of the vector that connects a to b
        //each variable is an object with x and y
        //the coordinates system is assumed to start at top left corner of the container
        if (b.x >= a.x) {
            if (b.y <= a.y) {
                //FIRST QUADRANT     
                value = quadrant ? 'first' : 45 * 1;
            } else {
                //FOURTH QUADRANT           
                value = quadrant ? 'fourth' : 45 * 7;
            }
        } else {

            if (b.y <= a.y) {
                //SECOND QUADRANT
                value = quadrant ? 'second' : 45 * 3;
            } else {
                //THIRD QUADRANT
                value = quadrant ? 'third' : 45 * 5;
            }
        }
        return value;
    };
    // Converts from degrees to radians.
    var radians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    // Converts from radians to degrees.
    var degrees = function(radians) {
        return radians * 180 / Math.PI;
    };

    var resizeCallbacks = [];

    var attachResizeCallback = function(cb) {
        //attach a callback to an array of functions to be executed on resize
        resizeCallbacks.push(cb);
    };
    var runResizeCallbacks = function() {
        _.forEach(resizeCallbacks, function(n) {
            //run the callback
            try {
                n();
            } catch (e) {
                console.warn(e);
            }
        });
    };
    var publicInterface = {
        isSmall: isSmall,
        isMedium: isMedium,
        isLarge: isLarge,
        toggleViewportClassname: toggleViewportClassname,
        disableEventsOnScroll: disableEventsOnScroll,
        getDistance: getDistance,
        getAngle: getAngle,
        radians: radians,
        degrees: degrees,
        attachResizeCallback: attachResizeCallback,
        runResizeCallbacks: runResizeCallbacks
    };

    return publicInterface;
})();

module.exports = Toolkit;