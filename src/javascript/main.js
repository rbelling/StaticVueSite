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
        window.promiseA = new Promise(function(resolve, reject) {
            //here we have some code, maybe async
            setTimeout(function() {
                window.executed = true;
                if (window.executed) {
                    resolve('All good baby baby!')
                } else {
                    reject('Something went wrong');
                }                
            }, 3500);
        });

        window.promiseA.then(function(res) {
            console.log('Ci siamo: ', res, ' ora aspetto un po');  
            return new Promise(function(resolve, reject) {
                setTimeout(function(){
                    reject('some error at the second round of promises');
                }, 2000);
            });
            
          
        }).then(function(res) {
            console.log('seconda finita');
        })
        .catch(function(res){
            console.log('Error: ', res);
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