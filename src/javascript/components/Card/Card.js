//import {throttle} from 'lodash';
import 'classlist-polyfill'; //we need classlist polyfill since we're supporting ie9
import '../../vendor/gsap/TweenMax';
import './sass/Card.scss'; // this layout's specific stylesheet

//const d = 1250; //tween duration
class Card {
  constructor(data, container) {
    this.data = data;
    this.container = container;
    this.card = null;
    this.cardFront = null;
    this.cardBack = null;

    this.setMarkup();
    this.container.appendChild(this.cardContainer);
    this.setupInteraction();

  }

  setupInteraction() {
    this.cardContainer.addEventListener('ontouchstart', (function() {
      if (this.cardContainer.classList.contains('hover')) {
        this.cardContainer.classList.remove('hover');
      }
      else {
        this.cardContainer.classList.add('hover');
      }

    }).bind(this));
  }

  setMarkup() {
    this.cardFront = document.createElement('div');
    this.cardFront.classList.add('r-card__front');
    this.cardBack = document.createElement('div');
    this.cardBack.classList.add('r-card__back');
    this.card = document.createElement('div');
    this.card.classList.add('r-card');
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('r-card-container');
    this.cardContainer.addEventListener('click', (function (evt) {
      evt;
      this.cardContainer.classList.toggle('hover');
    }).bind(this));


    this.cardBack.innerHTML = `
      <div class="card__content">
        <p class="victim-title">${this.data.name.first}'s Designated Victim is:</p>
        <div class="name">${this.data.victim.name.last || 'Misterious'},&nbsp;<p>${this.data.victim.name.first || 'Misterious'}</p></div>
      </div>
    `;
    this.cardFront.innerHTML = `
      <div class="card__content">
        <div class="name">${this.data.name.last || 'Misterious'},&nbsp;<p>${this.data.name.first || 'Misterious'}</p></div>
      </div>
    `;

    this.card.appendChild(this.cardFront);
    this.card.appendChild(this.cardBack);
    this.cardContainer.appendChild(this.card);
  }
}

export default Card;
