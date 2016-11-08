import 'classlist-polyfill'; //we need classlist polyfill since we're supporting ie9
import './sass/Card.scss'; // this layout's specific stylesheet

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
    this.cardContainer.addEventListener('click', this.flip.bind(this));
  }

  flip() {
    this.cardContainer.classList.toggle('hover');
  }
  setMarkup() {
    this.cardFront = document.createElement('div');
    this.cardFront.classList.add('r-card__front');
    this.cardBack = document.createElement('div');
    this.cardBack.classList.add('r-card__back');
    this.card = document.createElement('div');
    this.card.classList.add('r-card');
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('r-card-container', 'u-strangerify');

    this.cardBack.innerHTML = `
      <div class="card__content">
        <p class="victim-title u-strangerify">${this.data.name.first}'s designated Victim is:</p>
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
    this.cardContainer.appendChild(this.card);
  }
}

export default Card;
