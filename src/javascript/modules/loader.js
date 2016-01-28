/*----------  Javascript responsible for the loader  ----------*/
import EVTS from '../../../gulp/data/events';
import eventBus from '../utils/eventBus';

export default (() => {
  const label = 'js--loader-label';
  const show = () => {
    console.time(label);
  };
  const hide = () => {
    console.timeEnd(label);
  };
  const init = () => {
    eventBus.on(EVTS.LOADING, show);
    eventBus.on(EVTS.LOADED, hide);
  };
  return {
    init, show, hide,
  };
})();
