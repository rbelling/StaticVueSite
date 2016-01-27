// Browserify entry point for the page.js bundle (yay JavaScript!)
require('./vendor/picturefill.js');
require('./vendor/Modernizr');
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
    eventBus,
  };
  const init = ($ref) => {
    console.log('init');
    s.$ref = $ref;
    _initModules();
    _handleEvents();
  };
  const _initModules = function () {
    fastClick(document.body, {});
  };
  const _handleEvents = function () {
    s.eventBus.emit(EVTS.LOADED);
    s.toolkit.disableEventsOnScroll();
    s.toolkit.attachResizeCallback(s.toolkit.toggleViewportClassname);

    $(window).on('resize', _.debounce(_.bind(s.toolkit.runResizeCallbacks, this), 500));
  };

  return init;
};

module.exports = main;
