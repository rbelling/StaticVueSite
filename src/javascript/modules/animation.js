/* ============================
 =            GSAP            =
 ============================ */
import './vendor/gsap/TweenMax';
import './vendor/gsap/plugins/ScrollToPlugin.js';

export default (() => {
    const _tl = new TimelineLite({
        paused: true,
    });
    const _intro = () => {
        const startDelay = 0.3;
        //prepare the targets
        TweenLite.set($navLogo, {y: -50, autoAlpha: 0, scale: 0.8});
        TweenLite.set($title, {y: 60, autoAlpha: 0, scale: 0.9});
        TweenLite.set($subtitle, {y: 30, autoAlpha: 0, scale: 0.9});
        TweenLite.set($cta, {y: 50, autoAlpha: 0, scale: 0.9, force3D: true});
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
                $cta, 0.1, {scale: 1.04}, '+=0.4'
            ).to(
            $cta, 0.1, {scale: 1, clearProps: 'scale'}, '+=0.05'
        )
        ;

        tl.play();
    };
    const init = () => {
    };
    return {
        init,
    };
})();
