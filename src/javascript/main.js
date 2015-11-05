// Browserify entry point for the page.js bundle (yay JavaScript!)
var $ = global.$ = require('npm-zepto');
var Picturefill = require('./vendor/picturefill.js');
var _ = require('lodash');
var FastClick = require('fastclick');
var TweenMax = require('gsap');

var toolkit = require('./utils/toolkit.js');

var main = (function($ref) {
    var s = {
        //settings - these values are cached and can be used by all components of this module
        resizeCallbacks: [],
        toolkit: toolkit
    };
    var init = function($ref) {
        s.$ref = $ref;
        _initModules();
        _handleEvents();
    };
    var _initModules = function() {

    };
    var _handleEvents = function() {
        FastClick(document.body, {});
        s.toolkit.disableEventsOnScroll();
        s.toolkit.attachResizeCallback(s.toolkit.toggleViewportClassname); //push a resize callback to the array

        $(window).on('resize', _.debounce(_.bind(s.toolkit.runResizeCallbacks, this), 500));
    };

    return init;
});

module.exports = main;