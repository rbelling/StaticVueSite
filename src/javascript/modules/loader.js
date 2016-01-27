/*----------  Javascript responsible for the loader  ----------*/
const EVTS = require('../../../gulp/data/events');

export default (() => {
  const s = {
    loadingClass: 'is-loading',
    label: 'js--loader-label',
    eventBus: window.eventBus || require('../utils/eventBus'),
  };
  const show = () => {
    console.time(s.label);
  };
  const hide = () => {
    console.timeEnd(s.label);
  };
  const init = (ref) => {
    s.ref = ref;
    s.eventBus.on(EVTS.LOADING, show);
    s.eventBus.on(EVTS.LOADED, hide);
  };
  return {
    init, show, hide,
  };
})();
