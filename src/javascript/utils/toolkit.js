import mainConfig from '../../../gulp/config.js';
const config = mainConfig.app;

export default (() => {
  const isSmall = () => {
    const mobileMq = `only screen and (max-width: ${config.breakpoints.small}px)`;
    return Modernizr.mq(mobileMq);
  };
  const isMedium = () => {
    const mobileMq = `only screen and (max-width: ${config.breakpoints.medium}px) and (min-width: ${config.breakpoints.small}px)`;
    return Modernizr.mq(mobileMq);
  };
  const isLarge = () => {
    const mobileMq = `only screen and (min-width: ${config.breakpoints.medium}px)`;
    return Modernizr.mq(mobileMq);
  };
  const toggleViewportClassname = () => {
    const $body = $('body');
    $body.removeClass('is-large is-medium is-small');
    if (window) {
      if (window.app.toolkit.isLarge()) {
        $body.addClass('is-large');
      } else if (window.app.toolkit.isMedium()) {
        $body.addClass('is-medium');
      } else if (window.app.toolkit.isSmall()) {
        $body.addClass('is-small');
      } else {
        console.warn('unhandled scenario');
      }
    }
  };
  const disableEventsOnScroll = () => {
    // https://github.com/ryanseddon/60fps-scroll/blob/master/dist/60fps-scroll.js
    let scrollStarted = false;
    let timer;
    const listen = () => {
      if (!scrollStarted) {
        document.body.style.pointerEvents = 'none';
        scrollStarted = true;
      }
      clearTimeout(timer);

      timer = setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
        scrollStarted = false;
      }, 500);
    };
    if (_.isFunction(document.addEventListener)) {
      return;
    }
    window.addEventListener('scroll', _.throttle(listen, 500, false));
  };
  const getDistance = (a, b) => {
    // computes the positive distance between two points using Pythagoras' Theorem
    // each variable is an object with x and y
    const horizontal = (a.x - b.x);
    const vertical = (a.y - b.y);

    return Math.sqrt(Math.pow(horizontal, 2) + Math.pow(vertical, 2));
  };
  const getAngle = (a, b, quadrant) => {
    // computes the angle of the vector that connects a to b
    // each variable is an object with x and y
    // the coordinates system is assumed to start at top left corner of the container
    let value;
    if (b.x >= a.x) {
      if (b.y <= a.y) {
        // FIRST QUADRANT
        value = quadrant ? 'first' : 45;
      } else {
        // FOURTH QUADRANT
        value = quadrant ? 'fourth' : 45 * 7;
      }
    } else {
      if (b.y <= a.y) {
        // SECOND QUADRANT
        value = quadrant ? 'second' : 45 * 3;
      } else {
        // THIRD QUADRANT
        value = quadrant ? 'third' : 45 * 5;
      }
    }
    return value;
  };
  // Converts from degrees to radians.
  const radians = (degs) => {return degs * Math.PI / 180; };

  // Converts from radians to degrees.
  const degrees = (rads) => {return rads * 180 / Math.PI; };

  const resizeCallbacks = [];

  const attachResizeCallback = (cb) => {
    // attach a callback to an array of functions to be executed on resize
    resizeCallbacks.push(cb);
  };
  const runResizeCallbacks = () => {
    _.forEach(resizeCallbacks, (n) => {
      // run the callback
      try {
        n();
      } catch (e) {
        console.warn(e);
      }
    });
  };
  const testBodyTag = () => {
    const len = $('body').length;
    return len * 3;
  };
  const stripHtmlTags = (str) => str.replace(/<(?:.|\n)*?>/gm, '');

  return {
    testBodyTag,
    isSmall,
    isMedium,
    isLarge,
    toggleViewportClassname,
    disableEventsOnScroll,
    getDistance,
    getAngle,
    radians,
    degrees,
    attachResizeCallback,
    runResizeCallbacks,
    stripHtmlTags,
  };
})();
