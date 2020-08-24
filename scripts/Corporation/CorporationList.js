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
    <h2 class="list__header">Corporations</h2>
    <article class="list corporation-list">
      ${ corporations.map(Corporation).join('') }
    </article>
  `;
};