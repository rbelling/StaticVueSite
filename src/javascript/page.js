import './vendor/Modernizr';
import fastClick from 'fastclick';
import Loader from './modules/loader';
// import './vendor/picturefill.js';
// import './vendor/gsap/TweenMax';
// import './vendor/gsap/plugins/ScrollToPlugin.js';

// require('../sass/app.scss');
require('../templates/index.hbs');

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
