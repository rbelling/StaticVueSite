/*----------  Javascript responsible for the loader  ----------*/
import TweenLite from '../vendor/gsap/TweenLite';

export default (() => {
  const $loader = document.querySelectorAll('.r-loader-screen');
  const hide = () => {
    TweenLite.to($loader, 1, {
      autoAlpha: 0,
      ease: Power3.easeOut,
      //ease: Linear.easeNone,
    });
  };
  const init = () => {

  };
  return {
    init, hide,
  };
})();
