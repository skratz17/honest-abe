import { getPoliticians, usePoliticians } from './PoliticianProvider.js';
import { Politician } from './Politician.js';

const contentTarget = document.querySelector('.politician-list-container');

let politicians = [];

export const PoliticianList = () => {
  getPoliticians()
    .then(() => {
      politicians = usePoliticians();
      render();
    })
};

const render = () => {
  contentTarget.innerHTML = `
    <h2>Politicians</h2>
    <article class="politician-list">
      ${ politicians.map(Politician).join('') }
    </article>
  `;
};