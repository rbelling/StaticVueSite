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
        promises();
        s.$ref = $ref;
        _initModules();
        _handleEvents();
    };

    let promises = function() {
        window.count = 0;

        window.cssLoaded = new Promise(function(resolve, reject){
            setTimeout(function() {
                resolve('fonts loaded!');
            }, 10000);
        });        
        window.fontsLoaded = new Promise(function(resolve, reject) {
            //here we have some code, maybe async
            setTimeout(function() {
                resolve('css Loaded!');                
            }, 3500);
        });
        window.jsLoaded = new Promise(function(resolve, reject) {
            //here we have some code, maybe async
            setTimeout(function() {
                resolve('JS Loaded!');                
            }, 12500);
        });

        window.cssLoaded.then(function(res) {
            console.log(res);
            window.count++;
            return window.fontsLoaded;
        }).then(function(res){
            console.log(res);
            window.count++;
        }).catch(function(res) {
            console.log(res);
        });  

        window.jsLoaded.then(function(res) {
            console.log(res);
            window.count++;
        }); 


        let assetsPromises = [window.cssLoaded, window.jsLoaded, window.fontsLoaded]
        Promise.all(assetsPromises).then(function(res) {
            console.log('all done: ', window.count, res);
        }).catch(function(msg) {
            console.log('ABORT: catching all of them: ', msg);
        });

    }
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