import {throttle} from 'lodash';
import 'classlist-polyfill'; //we need classlist polyfill since we're supporting ie9
import '../../vendor/gsap/TweenMax';
// import './sass/Card.scss'; // this layout's specific stylesheet

const d = 1250; //tween duration
class Card {
  constructor(data, container) {
    this.data = data;
    this.container = container;
    this.card = null;
    this.cardFront = null;
    this.cardBack = null;

    this.setMarkup();
    this.container.appendChild(this.card);
    this.setupInteraction();

  }

  setupInteraction() {
    CSSPlugin.defaultTransformPerspective = 1000;
    TweenMax.set(this.cardBack, {rotationY: -180});
    this.card.addEventListener('click', throttle(this.flip.bind(this), d, false));
  }

  flip() {
    const tl = new TimelineMax({
      paused: true
    });
    tl.addLabel('begin')
      .to(this.cardFront, d/1000, {rotationY: '+=180', ease: Bounce.easeOut})
      .to(this.cardBack, d/1000, {rotationY: '+=180', ease: Bounce.easeOut}, 'begin')
      .to(this.card, d/2/1000, {z: 50}, 'begin')
      .to(this.card, d/2/1000, {z: 0},  'begin+'+d/2/1000);
    tl.play();
  }

  setMarkup() {
    this.cardFront = document.createElement('div');
    this.cardFront.classList.add('r-card__front');
    this.cardBack = document.createElement('div');
    this.cardBack.classList.add('r-card__back');
    this.card = document.createElement('div');
    this.card.classList.add('r-card', 'u-strangerify');

    this.cardBack.innerHTML = `
      <div class="card__content">
        <p class="victim-title u-strangerify">${this.data.name.first}'s Designated Victim is:</p>
        <div class="name u-strangerify">${this.data.victim.name.last || 'Misterious'},&nbsp;<p>${this.data.victim.name.first || 'Misterious'}</p></div>
      </div>
    `;
    this.cardFront.innerHTML = `
      <div class="card__content">
        <div class="name u-strangerify">${this.data.name.last || 'Misterious'},&nbsp;<p>${this.data.name.first || 'Misterious'}</p></div>
      </div>
    `;

    this.card.appendChild(this.cardFront);
    this.card.appendChild(this.cardBack);
  }
}

export default Card;
