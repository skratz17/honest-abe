import { getPoliticians, usePoliticians } from './PoliticianProvider.js';
import { Politician } from './Politician.js';
import { getPacs, usePacs } from '../PAC/PACProvider.js';
import { getPacDonations, usePacDonations } from '../Donation/PacDonationsProvider.js';
import { getLegislations, useLegislations } from '../Legislation/LegislationProvider.js';
import { getPoliticianLegislations, usePoliticianLegislations } from '../Legislation/PoliticianLegislationProvider.js';
import { getInterests, useInterests } from '../Legislation/InterestProvider.js';

const contentTarget = document.querySelector('.politician-list-container');

let politicians = [];
let pacs = [];
let pacDonations = [];
let legislations = [];
let politicianLegislations = [];
let interests = [];

export const PoliticianList = () => {
  Promise.all([ getPoliticians(), getPacs(), getPacDonations(), getLegislations(), getPoliticianLegislations(), getInterests() ])
    .then(() => {
      politicians = usePoliticians();
      pacs = usePacs();
      pacDonations = usePacDonations();
      legislations = useLegislations();
      politicianLegislations = usePoliticianLegislations();
      interests = useInterests();
      render();
    });
};

const render = () => {
  attachExtraPropertiesToPoliticians();

  contentTarget.innerHTML = `
    <h2 class="list__header">Politicians</h2>
    <article class="list politician-list">
      ${ politicians.map(Politician).join('') }
    </article>
  `;
};

const attachExtraPropertiesToPoliticians = () => {
  politicians.forEach(politician => {
    politician.donors = getDonorsForPolitician(politician);
    politician.legislations = getLegislationsForPolitician(politician);
  });
};

const getDonorsForPolitician = politician => {
  return pacDonations
    .filter(pacDonation => pacDonation.politicianId === politician.id)
    .map(pacDonation => {
      const pac = pacs.find(p => p.id === pacDonation.pacId);
      return { ...pac, amount: pacDonation.amount };
    });
};

const getLegislationsForPolitician = politician => {
  return politicianLegislations
    .filter(politicianLegislation => politicianLegislation.politicianId === politician.id)
    .map(politicianLegislation => legislations.find(legislation => legislation.id === politicianLegislation.legislationId))
    .map(legislation => ({ ...legislation, interest: getInterestForLegislation(legislation) }));
};

const getInterestForLegislation = legislation => {
  return interests.find(interest => interest.id === legislation.interestId);
};