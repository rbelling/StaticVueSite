/*----------  Javascript responsible for the loader  ----------*/
import TweenMax from '../vendor/gsap/TweenMax';

const loader = () => {
  const $loader = document.querySelectorAll('.r-loader-screen');
  const hide = () => {
    TweenMax.to($loader, 1, {
      autoAlpha: 0,
      display: 'none',
      ease: Power3.easeOut,
    });
  };
  return {
    hide
  };
};

export default loader();
