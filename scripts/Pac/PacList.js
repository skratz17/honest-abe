import { getPacs, usePacs } from './PACProvider.js';
import { Pac } from './Pac.js';

const contentTarget = document.querySelector('.pac-list-container');

let pacs = [];

export const PacList = () => {
  getPacs()
    .then(() => {
      pacs = usePacs();
      render();
    })
};

const render = () => {
  contentTarget.innerHTML = `
    <h2>PACs</h2>
    <article class="pac-list">
      ${ pacs.map(Pac).join('') }
    </article>
  `;
};