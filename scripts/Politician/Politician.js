import { moneyFormatter } from '../utilities/moneyFormatter.js';

export const Politician = politician => {
  const { name, age, district, donors } = politician;

  return `
    <section class="politician">
      <header class="politician__name">
          <h3>${name.first} ${name.last}</h3>
      </header>
      <div class="politician__info">
          <div>Age: ${age}</div>
          <div>Represents: ${district}</div>
      </div>
      <div class="pac__donations">
        <h4>PAC Donations</h4>
        <ul>
          ${ donors.map(donor => `<li>${donor.registeredName} (${moneyFormatter.format(donor.amount)})</li>`).join('') }
        </ul>
      </div>
    </section>
  `;
};