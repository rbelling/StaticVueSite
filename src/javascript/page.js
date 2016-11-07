import './vendor/Modernizr';

import loader from './modules/loader';
import Santa from './components/Santa/Santa';
import './vendor/gsap/TweenMax';
import './vendor/gsap/plugins/TextPlugin.min';
// import './vendor/gsap/plugins/CSSPlugin';
// import './vendor/gsap/plugins/ScrollToPlugin';

import '../sass/app.scss'; //import the main css file into our js bundle
const {users} = require('../users.json'); //Requiring this json, in order to avoid a runtime ajax call

const page = () => {
  const init = () => {
    window.onload = () => {
      loader.hide();
    };
    new Santa(users);
  };

  return {init};
};

page().init();
export default page;
