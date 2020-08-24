import { moneyFormatter } from '../utilities/moneyFormatter.js';

export const Politician = politician => {
  const { name, age, district, donors, legislations, corporations } = politician;

  return `
    <section class="card politician">
      <header class="politician__name">
          <h3>${name.first} ${name.last}</h3>
      </header>
      <div class="politician__info">
          <div>Age: ${age}</div>
          <div>Represents: ${district}</div>
      </div>
      <div class="info-list-wrapper politician__bills">
        <h4>Sponsored Bills</h4>
        <ul class="info-list">
          ${ legislations.map(legislation => `<li>${ legislation.name } (Interest: ${ legislation.interest.about })</li>`).join('') || 'NONE. This guy is not very busy.' }
        </ul>
      </div>
      <div class="info-list-wrapper pac__donations">
        <h4>PAC Donations</h4>
        <ul class="info-list">
          ${ donors.map(donor => `<li>${donor.registeredName} (${moneyFormatter.format(donor.amount)})</li>`).join('') || 'NONE. This guy is squeaky clean.'}
        </ul>
      </div>
      <div class="politician__influencers">
        <h4>Influencing Corporations</h4>
        <ul class="info-list">
          ${ corporations.map(corporation => `<li>${corporation.company}</l1>`).join('') || 'NONE. Clean as a whistle.' }
        </ul>
      </div>
    </section>
  `;
};