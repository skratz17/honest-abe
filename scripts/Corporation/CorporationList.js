import { getCorporations, useCorporations } from './CorporationProvider.js';
import { Corporation } from './Corporation.js';

const contentTarget = document.querySelector('.corporation-list-container');

let corporations = [];

export const CorporationList = () => {
  getCorporations()
    .then(() => {
      corporations = useCorporations();
      render();
    });
};

const render = () => {
  contentTarget.innerHTML = `
    <h2>Politicians</h2>
    <article class="politician-list">
      ${ corporations.map(Corporation).join('') }
    </article>
  `;
};