import { getPacs, usePacs } from './PACProvider.js';
import { Pac } from './Pac.js';
import { getCorporateDonations, useCorporateDonations } from '../Donation/CorporateDonationsProvider.js';
import { getCorporations, useCorporations } from '../Corporation/CorporationProvider.js';

const contentTarget = document.querySelector('.pac-list-container');

let pacs = [];
let corporations = [];
let corporateDonations = [];

export const PacList = () => {
  Promise.all([ getPacs(), getCorporations(), getCorporateDonations() ])
    .then(() => {
      pacs = usePacs();
      corporations = useCorporations();
      corporateDonations = useCorporateDonations();
      render();
    });
};

const render = () => {
  attachDonorsToPacs();

  contentTarget.innerHTML = `
    <h2>PACs</h2>
    <article class="pac-list">
      ${ pacs.map(Pac).join('') }
    </article>
  `;
};

const attachDonorsToPacs = () => {
  pacs.forEach(pac => {
    pac.donors = corporateDonations
      .filter(corporateDonation => corporateDonation.pacId === pac.id)
      .map(corporateDonation => {
        const donatingCorporation = corporations.find(corporation => corporation.id === corporateDonation.corporationId);
        return { ...donatingCorporation, amount: corporateDonation.amount };
      });
  });
};