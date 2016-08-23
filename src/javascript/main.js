// Browserify entry point for the page.js bundle (yay JavaScript!)
import './vendor/picturefill.js';
import './vendor/Modernizr';
/* ============================
 =            GSAP            =
 ============================ */
import './vendor/gsap/TweenMax';
import './vendor/gsap/plugins/ScrollToPlugin.js';
/* =====  End of GSAP  ======*/
import fastClick from 'fastclick';
import toolkit from './utils/toolkit.js';
import EVTS from '../../gulp/data/events';
import Loader from './modules/loader';
import Animation from './modules/animation';

export default (() => {
    const _initModules = () => {
        fastClick(document.body, {});
    };
    const _handleEvents = () => {
        toolkit.disableEventsOnScroll();
        // toolkit.attachResizeCallback(toolkit.toggleViewportClassname);
        $(window).on('resize', _.debounce(_.bind(toolkit.runResizeCallbacks, this), 500));
    };

    const init = () => {
        _initModules();
        _handleEvents();
        TweenLite.defaultEase = Power2.easeOut;
        console.log(`app - ready`);

        Loader.hide();
        Animation.init();
    };
    return {
        init,
    };
})();