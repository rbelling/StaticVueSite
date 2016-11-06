import './sass/Card.scss'; // this layout's specific stylesheet

class Card {
  constructor(data) {
    console.log('received', data);
    this.data = data;
  }

  getMarkup() {
    return `
        <div class='r-cell open-modal' data-victim="${this.data.victim}" data-guid="${this.data.guid}">
          <p class="lastname">${this.data.name.last}</p>
          <p class="name">${this.data.name.first}</p>
        </div>
    `;
  }

  flip() {

  }
}

export default Card;
