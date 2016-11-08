/*----------  Javascript responsible for the loader  ----------*/
import TweenMax from '../vendor/gsap/TweenMax';

const loader = () => {
  const $loader = document.querySelector('.r-loader-screen');
  const hide = () => {
    TweenMax.to($loader, 0.5, {
      autoAlpha: 0
    });
  };
  return {
    hide
  };
};

export default loader();
