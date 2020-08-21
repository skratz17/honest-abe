import { moneyFormatter } from '../utilities/moneyFormatter.js';

export const Pac = pac => {
  const { registeredName, address, donors } = pac;

  return `
    <section class="pac">
      <header class="pac__name">
          <h3>${registeredName}</h3>
      </header>
      <div class="pac__info">
          <div>${address}</div>
      </div>
      <div class="pac__donors">
          <h4>Donors</h4>
          <ul>
            ${ donors.map(donor => `<li>${donor.company} (${moneyFormatter.format(donor.amount)})</li>`).join('') }
          </ul>
      </div>
    </section>
  `;
};