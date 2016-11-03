import {shuffle, assign} from 'lodash';
import $ from 'bonzo';

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
      isConspiratorCls = 'is-conspirator';
    var self = this;
    for (const cell of this.cells) {

      cell.addEventListener('mouseover', (event) => {
        const victim = self.getVictimNode(event.target),
          conspirator = event.target;
        $(conspirator).addClass(isConspiratorCls);
        $(victim).addClass(isVictimCls);
      });
      cell.addEventListener('mouseout', function () {
        const conspirators = document.querySelectorAll(`.${isConspiratorCls}`),
          victims = document.querySelectorAll(`.${isVictimCls}`);

        $(conspirators).removeClass(isConspiratorCls);
        $(victims).removeClass(isVictimCls);
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

  print() {
    console.log(this.markup);
  }
}

export default Santa;
