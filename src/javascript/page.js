// Browserify entry point for the page.js bundle (yay JavaScript!)

var $ = require('jquery');
var _ = require('lodash');
var TweenLite = require('gsap');
// var modernizrBuildConfig = require('../../gulp/config.js').modernizr;
// window.modernizr = require('modernizr'); //MODERNIZR 3.0.0.alpha.4 is not working with version 2.11.2 of NPM, so I'm including Modernizr externally for the moment
// window.modernizr.build(
// 	modernizrBuildConfig
// );

var toolkit = require('./utils/toolkit.js');
var CarouselFull = require('./modules/CarouselFull.js');


var self;
var _app = (function() {
      function App(){           
            self = this;
            self.toolkit = toolkit;
            self.resizeCallbacks = [];
            self.init();
      }
      App.prototype.init = function() {
            self.initModules();
            self.handleEvents();
      };      
      App.prototype.initModules = function() {
           new CarouselFull($('.wpCarousel').eq(0), {
                  current : 0,
                  duration : 0.9,
                  has_counter : true,
                  has_autoplay : true
            });
           new CarouselFull($('.wpCarousel').eq(1), {
                  current : 3,
                  duration : 0.5,
                  has_counter : true,
                  has_autoplay : false
            });           
      };
      App.prototype.handleEvents = function() {
            self.toolkit.disableEventsOnScroll();
            $(window).on('resize', _.debounce(_.bind(self.runResizeCallbacks, this), 500));

            self.resizeCallbacks.push(self.toolkit.toggleViewportClassname); //push a resize callback to the array
      };     
      App.prototype.runResizeCallbacks = function() {
            _.forEach(self.resizeCallbacks, function(n){
                  //run the callback
                  try {n();}
                  catch(e){console.warn(e);}
            });
      }
      App.prototype.attachResizeCallback = function(cb) {
            //attach a callback to an array of functions to be executed on resize
          self.resizeCallbacks.push(cb);
      }   

      return App;
  })();

window.app = new _app();