// Browserify entry point for the page.js bundle (yay JavaScript!)
require('./vendor/picturefill.js');
require('./vendor/Modernizr');
const _ = require('lodash');
/* ============================
 =            GSAP            =
 ============================ */
require('./vendor/gsap/TweenLite.js');
/* =====  End of GSAP  ======*/
const fastClick = require('fastclick');
const toolkit = require('./utils/toolkit.js');
const EVTS = require('../../gulp/data/events');

const main = () => {
  const s = {
    // settings - these values are cached and can be used by all components of this module
    resizeCallbacks: [],
    toolkit,
    eventBus: window.eventBus,
  };
  const _initModules = () => {
    fastClick(document.body, {});
  };
  const _handleEvents = () => {
    s.eventBus.emit(EVTS.LOADED);
    s.toolkit.disableEventsOnScroll();
    s.toolkit.attachResizeCallback(s.toolkit.toggleViewportClassname);

    $(window).on('resize', _.debounce(_.bind(s.toolkit.runResizeCallbacks, this), 500));
  };

  return ($ref) => {
    s.$ref = $ref;
    _initModules();
    _handleEvents();
  };
};

module.exports = main;
