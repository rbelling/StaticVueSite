import loader from './modules/loader';

window.critical = (() => {
  loader.init('#js-app');
  loader.show();
})();
