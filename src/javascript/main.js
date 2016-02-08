// Browserify entry point for the page.js bundle (yay JavaScript!)
import './vendor/picturefill.js';
import './vendor/Modernizr';

/* ============================
 =            GSAP            =
 ============================ */
require('./vendor/gsap/TweenMax.js');
require('./vendor/gsap/plugins/ScrollToPlugin.js');
/* =====  End of GSAP  ======*/
import fastClick from 'fastclick';
import toolkit from './utils/toolkit.js';
import EVTS from '../../gulp/data/events';

export default (() => {
  const $title = $('.r-hero__title');
  const $subtitle = $('.r-hero__subtitle');
  const $cta = $('.r-hero__cta');
  const $menu = $('.r-menu');
  const $navLogo = $('.r-nav-logo');
  const tl = new TimelineLite({
    paused: true,
  });

  const _initModules = () => {
    fastClick(document.body, {});
  };
  const _handleEvents = () => {
    eventBus.on(EVTS.LOADED, _animate);
    toolkit.disableEventsOnScroll();
    toolkit.attachResizeCallback(toolkit.toggleViewportClassname);
    $(window).on('resize', _.debounce(_.bind(toolkit.runResizeCallbacks, this), 500));
    $('.js-scrollTo').on('click', _scrollToSection);
  };
  const _scrollToSection = (event) => {
    const targetSection = $(event.currentTarget).data('scroll');
    const $target = $(`[data-section=${targetSection}]`);
    if ($target) {
      TweenMax.to(window, 0.6, {
        scrollTo: {
          y: $target.offset().top,
        },
        ease: Power3.easeOut
      });
    }
    else {
      console.log(`attempting to scroll to a null target`);
    }
  };
  const _animate = () => {
    const startDelay = 0.3;
    //prepare the targets
    TweenLite.set($navLogo, {y: -50, autoAlpha: 0, scale: 0.7});
    TweenLite.set($title, {y: 60, autoAlpha: 0, scale: 0.8});
    TweenLite.set($subtitle, {y: 30, autoAlpha: 0, scale: 0.9});
    TweenLite.set($cta, {y: 50, autoAlpha: 0, scale: 0.6});
    TweenLite.set($menu, {y: 0, autoAlpha: 0, scale: 0.9});
    //tween them
    tl
      .set($navLogo, {delay: startDelay})
      .addLabel('begin')
      .to(
        $title, 0.5, {autoAlpha: 1, y: 0, scale: 1, ease: Power4.easeOut}, '-= 0.2'
      )
      .to(
        $subtitle, 0.4, {autoAlpha: 1, y: 0, scale: 1, ease: Power2.easeOut}, '-= 0.3'
      )
      .to(
        $cta, 0.3, {autoAlpha: 1, y: 0, scale: 1}, '-= 0.4'
      )
      .to(
        $navLogo, 0.3, {autoAlpha: 1, y: 0, scale: 1, ease: Back.easeOut}
      )
      .to(
        $menu, 0.3, {autoAlpha: 1, y: 0, scale: 1, ease: Power2.easeOut}, '-=0.3'
      )
      .to(
        $cta, 0.1, {scale: 1.1}, '+=0.4'
      ).to(
      $cta, 0.1, {scale: 1, clearProps: 'scale'}, '+=0.05'
    )
    ;

    //.to(
    //  $title, 0.3, { autoAlpha: 1, y: 0, scale: 1}
    //)
    //  .to(
    //    $subtitle, 0.3, { autoAlpha: 1, y: 0, scale: 1}
    //  )
    //  .to(
    //    $cta, 0.3, { autoAlpha: 1, y: 0, scale: 1}
    //  )
    tl.play();
  };
  const init = () => {
    _initModules();
    _handleEvents();
    TweenLite.set('.u-intro', {autoAlpha: 0});
    TweenLite.defaultEase = Back.easeOut;
    console.log(`app - ready`);
  };
  return {
    init,
  };
})();
