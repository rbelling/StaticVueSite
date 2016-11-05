import {shuffle, assign} from 'lodash';
import 'classlist-polyfill'; //we need classlist polyfill since we're supporting ie9

import './Santa.scss'; // this layout's specific stylesheet

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
        <div class='r-cell' data-victim="${cur.victim}" data-guid="${cur.guid}">
          ${cur.email}
        </div>
      `;
    }, ``);

    this.allSet();
  }

  allSet() {
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
