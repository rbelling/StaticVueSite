/*----------  Javascript responsible for the loader  ----------*/
import EVTS from '../../../gulp/data/events';

export default (() => {
  const $loader = document.querySelectorAll('.r-loader-screen');
  const show = () => {

  };
  const hide = () => {
    window.TweenLite.to($loader, 1, {
      autoAlpha: 0,
      ease: Power3.easeOut,
      //ease: Linear.easeNone,
    });
  };
  const init = () => {
    window.eventBus.on(EVTS.LOADED, hide);
  };
  return {
    init, show, hide,
  };
})();
