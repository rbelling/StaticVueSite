// Browserify entry point for the page.js bundle (yay JavaScript!)
import './vendor/picturefill.js';
import './vendor/Modernizr';

/* ============================
 =            GSAP            =
 ============================ */
import './vendor/gsap/TweenLite.js';
/* =====  End of GSAP  ======*/
import fastClick from 'fastclick';
import toolkit from './utils/toolkit.js';
import EVTS from '../../gulp/data/events';

export default (() => {
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
  const init = ($ref) => {
    s.$ref = $ref;
    _initModules();
    _handleEvents();
    console.log(`app - ready`);
  };
  return {
    init,
  };
})();
