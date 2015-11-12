// Browserify entry point for the page.js bundle (yay JavaScript!)
// require('./vendor/picturefill.js');
require('./vendor/Modernizr');
/*============================
=            GSAP            =
============================*/
require('./vendor/gsap/TweenLite.js');
require('./vendor/gsap/plugins/Draggable.js');
require('./vendor/gsap/plugins/TP.js');
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
        console.log('init');
        s.$ref = $ref;
        _initModules();
        _handleEvents();
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

    return init;
})();

module.exports = main;