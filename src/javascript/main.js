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
        console.log('init');
        s.$ref = $ref;
        _initModules();
        _handleEvents();
    };
    var _initModules = function() {
        FastClick(document.body, {});
        initAnimations();
    };
    var initAnimations = function() {
        let ele = document.querySelector("#animation"); 
        let ctx = ele.getContext('2d'); 
        let speed = 0.005;
        let width = ele.width = 1000;
        let height = ele.height = 1000;
        let start_x = 0;
        let start_y = 0;
        let end_x = 0;
        let end_y = 0;        
        // function logic () { 
        //     x += 10; 
        //     if (x < ele.width - width) 
        //         requestAnimationFrame(draw); 
        // } 
        function draw() { 
            ctx.clearRect( 0, 0, ele.width, ele.height); 
            // This sets the fill colour to red 
            ctx.fillStyle = "#ff0000"; 
            // fillRectangle( x, y, width, height); 
            let new_x = Math.max(1, lerp(start_x, end_x, speed));
            let new_y = Math.max(1, lerp(start_y, end_y, speed)); 
            console.log(start_x, end_x);  
            ctx.fillRect(new_x, new_y, 50, 50); 
            if (new_x != start_x) {
                start_x = new_x;
                start_y = new_y;
                requestAnimationFrame(draw);
            }
        }
        draw();
        function lerp(start, end, speed) {
            return start + (end-start) * speed;
        }
        ele.addEventListener('mousemove', function(event){
            end_x = event.clientX;
            end_y = event.clientY;
            draw();
        });
        // setInterval(logic, 1000/ 60);
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