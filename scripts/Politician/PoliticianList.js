import { getPoliticians, usePoliticians } from './PoliticianProvider.js';
import { Politician } from './Politician.js';
import { getPacs, usePacs } from '../PAC/PACProvider.js';
import { getPacDonations, usePacDonations } from '../Donation/PacDonationsProvider.js';

const contentTarget = document.querySelector('.politician-list-container');

let politicians = [];
let pacs = [];
let pacDonations = [];

export const PoliticianList = () => {
  Promise.all([ getPoliticians(), getPacs(), getPacDonations() ])
    .then(() => {
      politicians = usePoliticians();
      pacs = usePacs();
      pacDonations = usePacDonations();
      render();
    });
};

const render = () => {
  attachDonorsToPoliticians();

  contentTarget.innerHTML = `
    <h2 class="list__header">Politicians</h2>
    <article class="list politician-list">
      ${ politicians.map(Politician).join('') }
    </article>
  `;
};

const attachDonorsToPoliticians = () => {
  politicians.forEach(politician => {
    politician.donors = pacDonations
      .filter(pacDonation => pacDonation.politicianId === politician.id)
      .map(pacDonation => {
        const pac = pacs.find(p => p.id === pacDonation.pacId);
        return { ...pac, amount: pacDonation.amount };
      });
  });
};