/* ----------  Javascript responsible for the loader  ----------*/
import EVTS from '../../../gulp/data/events';
import '../vendor/gsap/TweenMax.js';

export default (() => {
  const $loader = document.querySelectorAll('.r-loader-screen');
  const show = () => {

  };
  const hide = () => {
    TweenLite.to($loader, 0.4, {
      autoAlpha: 0,
      ease: Linear.easeOut,
      //ease: Linear.easeNone,
    });
  };
  const init = () => {

  };
  return {
    init, show, hide,
  };
})();
