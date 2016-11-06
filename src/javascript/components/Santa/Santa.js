import {shuffle, assign} from 'lodash';
import 'classlist-polyfill'; //we need classlist polyfill since we're supporting ie9

import {jokes} from './jokes';
import './sass/Santa.scss'; // this layout's specific stylesheet
import Card from '../Card/Card';

class Santa {
  constructor(users) {
    (users.length < 2) ? alert(`You should get some friends, man.`) : true;
    //first of all, shuffle the users to get random conspirators / victims
    this.users = shuffle(users).map((conspirator, idx, victims) => {
      const victimIdx = (idx + 1 < victims.length) ? idx + 1 : 0;
      const victim = victims[victimIdx].guid;
      return assign({}, conspirator, {
        //get the guid of this conspirator's victim
        victim
      });
    });

    //shuffle again to have random cell distribution in the markup
    this.markup = shuffle(this.users).reduce((prev, cur) => {
      return `${prev}
        ${new Card(cur).getMarkup()}
      `;
    }, ``);

    this.allSet();
  }

  allSet() {
    this.setDynamicText();
    this.grid = document.querySelector('.r-grid');
    this.grid.innerHTML = this.markup;
    this.cells = document.querySelectorAll('.r-cell');

    const isVictimCls = 'is-victim',
      isConspiratorCls = 'is-conspirator',
      self = this;
    for (const cell of this.cells) {
      cell.addEventListener('mouseover', (event) => {
        const victim = self.getVictimNode(event.target),
          conspirator = event.target;
        conspirator.classList.add(isConspiratorCls);
        victim.classList.add(isVictimCls);
      });
      cell.addEventListener('mouseout', function () {
        const conspirator = document.querySelector(`.${isConspiratorCls}`),
          victim = document.querySelector(`.${isVictimCls}`);
        conspirator.classList.remove(isConspiratorCls);
        victim.classList.remove(isVictimCls);
      });

    }
  }

  setDynamicText() {
    const jokeContainer = document.querySelector('.joke');
    let idx = 0;
    const nextJoke = () => {
      const tl = new TimelineLite({paused: true});
      tl.to(jokeContainer, 0.5, {text: '...', ease:Linear.easeOut});
      tl.to(jokeContainer, 1, {text: '...' + jokes[idx], ease:Power2.easeOut});
      tl.append(TweenLite.delayedCall(3, nextJoke));

      idx = (jokes.length === idx + 1) ? 0 : idx + 1;
      tl.play();
    };

    nextJoke();
  }

  getConspiratorNode(victimElt) {
    const guid = victimElt.getAttribute('data-guid');
    return document.querySelector(`.r-cell[data-victim='${guid}']`);
  }

  getVictimNode(conspiratorElt) {
    const guid = conspiratorElt.getAttribute('data-victim');
    return document.querySelector(`.r-cell[data-guid='${guid}']`);
  }
}

export default Santa;
