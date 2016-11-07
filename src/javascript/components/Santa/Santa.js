import {shuffle, assign} from 'lodash';
import 'classlist-polyfill'; //we need classlist polyfill since we're supporting ie9
import '../../vendor/gsap/TweenMax';
import '../../vendor/gsap/plugins/ScrollToPlugin';

import {jokes} from './jokes';
// import './sass/Santa.scss'; // this layout's specific stylesheet
import Card from '../Card/Card';

class Santa {
  constructor(users) {
    this.setupCards(users);
    document.querySelector('.js-scrolldown').addEventListener('click', () => {
      TweenMax.to(window, 0.5, {ease: Power2.easeOut, scrollTo:{y:".info", offsetY:10}});
    });
    this.setupDynamicText();
  }

  setupCards(users) {
    this.grid = document.querySelector('.r-grid');
    this.cards = [];
    this.users = shuffle(users).map((conspirator, idx, victims) => {
      const victimIdx = (idx + 1 < victims.length) ? idx + 1 : 0;
      const victim = victims[victimIdx];
      return assign({}, conspirator, {
        //get the guid of this conspirator's victim
        victim
      });
    });
    if (users.length < 2) {
      alert(`We need more people for Secret Santa to make sense. Go get some!`);
      return;
    }
    for (const user of shuffle(this.users)) { //shuffle again to have random cell distribution in the markup
      const newCard = new Card(user, this.grid);
      this.cards.push(newCard);
    }
  }

  setupDynamicText() {
    const jokeContainer = document.querySelector('.joke');
    let idx = 0;
    const nextJoke = () => {
      const tl = new TimelineLite({paused: true});
      tl.to(jokeContainer, 0.7, {text: ''});
      tl.to(jokeContainer, 1.3, {text: '' + jokes[idx]});
      tl.append(TweenLite.delayedCall(2.5, nextJoke));

      idx = (jokes.length === idx + 1) ? 0 : idx + 1;
      tl.play();
    };

    nextJoke();
  }
}

export default Santa;
