// Browserify entry point for the page.js bundle (yay JavaScript!)
require('./vendor/picturefill.js');
require('./vendor/Modernizr');
/*============================
=            GSAP            =
============================*/
require('./vendor/gsap/TweenLite.js');
/*=====  End of GSAP  ======*/
var FastClick = require('fastclick');
var toolkit = require('./utils/toolkit.js');
var EVTS = require('../../gulp/data/events');

var main = (function() {
    var s = {
        //settings - these values are cached and can be used by all components of this module
        resizeCallbacks: [],
        toolkit,
        eventBus
    };
    var init = function($ref) {
        s.$ref = $ref;
        _initModules();
        _handleEvents();
        _setupWorkers();
    };
    var _initModules = function() {
        FastClick(document.body, {});
    };
    var _handleEvents = function() {
        s.eventBus.emit(EVTS.LOADED);
        s.toolkit.disableEventsOnScroll();
        s.toolkit.attachResizeCallback(s.toolkit.toggleViewportClassname); //push a resize callback to the array

        $(window).on('resize', _.debounce(_.bind(s.toolkit.runResizeCallbacks, this), 500));
    };
    var _setupWorkers = function() {
        var worker = new Worker('backgroundTask.js');
        worker.addEventListener('message', function(e) {
            console.log('Worker said: ', e.data);
        }, false);
        worker.postMessage('Please start computing the value');
        console.log('moving on with the flow of execution in the main thread ... ');
    }

    return init;
})();

module.exports = main;