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
  const _initModules = () => {
    fastClick(document.body, {});
  };
  const _handleEvents = () => {
    eventBus.emit(EVTS.LOADED);
    toolkit.disableEventsOnScroll();
    toolkit.attachResizeCallback(toolkit.toggleViewportClassname);

    $(window).on('resize', _.debounce(_.bind(toolkit.runResizeCallbacks, this), 500));
  };
  const init = () => {
    _initModules();
    _handleEvents();
    console.log(`app - ready`);
  };
  return {
    init,
  };
})();
