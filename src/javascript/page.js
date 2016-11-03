import './vendor/Modernizr';

import loader from './modules/loader';
import Santa from './modules/Santa';
import './vendor/gsap/TweenMax';
// import './vendor/gsap/plugins/CSSPlugin';
// import './vendor/gsap/plugins/ScrollToPlugin';

import '../sass/app.scss';
const {users} = require('../users.json');

const page = () => {
  const init = () => {
    loader.hide();
    const mySanta = new Santa(users);
    mySanta.print();
  };

  return {
    init,
  };
};

page().init();
export default page;
