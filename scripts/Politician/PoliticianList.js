import { getPoliticians, usePoliticians } from './PoliticianProvider.js';
import { Politician } from './Politician.js';
import { getPacs, usePacs } from '../PAC/PACProvider.js';
import { getPacDonations, usePacDonations } from '../Donation/PacDonationsProvider.js';
import { getLegislations, useLegislations } from '../Legislation/LegislationProvider.js';
import { getPoliticianLegislations, usePoliticianLegislations } from '../Legislation/PoliticianLegislationProvider.js';
import { getInterests, useInterests } from '../Legislation/InterestProvider.js';
import { getCorporations, useCorporations } from '../Corporation/CorporationProvider.js';
import { getCorporateInterests, useCorporateInterests } from '../Corporation/CorporateInterestProvider.js';
import { getCorporateDonations, useCorporateDonations } from '../Donation/CorporateDonationsProvider.js';

const contentTarget = document.querySelector('.politician-list-container');

let politicians = [];
let pacs = [];
let pacDonations = [];
let legislations = [];
let politicianLegislations = [];
let interests = [];
let corporations = [];
let corporateInterests = [];
let corporateDonations = [];

let expandedCorporations = [];

export const PoliticianList = () => {
  Promise.all([ getPoliticians(), getPacs(), getPacDonations(), getLegislations(), getPoliticianLegislations(), getInterests(), getCorporations(), getCorporateInterests(), getCorporateDonations() ])
    .then(() => {
      politicians = usePoliticians();
      pacs = usePacs();
      pacDonations = usePacDonations();
      legislations = useLegislations();
      politicianLegislations = usePoliticianLegislations();
      interests = useInterests();
      corporations = useCorporations();
      corporateInterests = useCorporateInterests();
      corporateDonations = useCorporateDonations();

      attachExtraPropertiesToCorporations();

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

const attachExtraPropertiesToCorporations = () => {
  corporations.forEach(corporation => {
    corporation.pacsDonatedTo = getPacsDonatedToForCorporation(corporation);
    corporation.interests = getInterestsForCorporation(corporation);
  });
};

const attachExtraPropertiesToPoliticians = () => {
  politicians.forEach(politician => {
    politician.donors = getDonorsForPolitician(politician);
    politician.legislations = getLegislationsForPolitician(politician);
    politician.corporations = getInfluencingCorporationsForPolitician(politician);
  });
};

const getPacsDonatedToForCorporation = corporation => {
  return corporateDonations
    .filter(corporateDonation => corporateDonation.corporationId === corporation.id)
    .map(corporateDonation => corporateDonation.pacId);
};

const getInterestsForCorporation = corporation => {
  return corporateInterests
    .filter(corporateInterest => corporateInterest.corporationId === corporation.id)
    .map(corporateInterest => corporateInterest.interestId);
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

const getInfluencingCorporationsForPolitician = politician => {
  const politicianInterests = new Set(politician.legislations.map(legislation => legislation.interestId));
  const pacsDonatingToPolitician = new Set(politician.donors.map(donor => donor.id));

  return corporations
    .filter(corporation => corporation.interests.some(interestId => politicianInterests.has(interestId)))
    .filter(corporation => corporation.pacsDonatedTo.some(pacId => pacsDonatingToPolitician.has(pacId)));
};