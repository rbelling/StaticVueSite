import './vendor/Modernizr';
import Santa from './components/Santa/Santa';
// import './vendor/gsap/plugins/CSSPlugin';
// import './vendor/gsap/plugins/ScrollToPlugin';

import '../sass/app.scss'; //import the main css file into our js bundle
import '../sass/critical.scss'; //import critical stylesheets
const {users} = require('../users.json'); //Requiring this json, in order to avoid a runtime ajax call

const page = () => {
  const init = () => {
    new Santa(users);
  };

  return {init};
};

page().init();
export default page;
