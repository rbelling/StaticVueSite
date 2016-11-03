import './vendor/Modernizr';
import fastClick from 'fastclick';
import Loader from './modules/loader';
// import './vendor/picturefill';
// import './vendor/gsap/TweenMax';
// import './vendor/gsap/plugins/ScrollToPlugin';

import '../sass/app.scss';

alert('so qua');
export default (() => {
  const _initModules = () => {
    fastClick(document.body, {});
  };

  const init = () => {
    _initModules();
    console.log(`app - ready`);

    Loader.hide();
  };
  return {
    init,
  };
})();
