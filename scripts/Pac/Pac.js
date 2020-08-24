import { moneyFormatter } from '../utilities/moneyFormatter.js';

export const Pac = pac => {
  const { registeredName, address, donors } = pac;

  return `
    <section class="card pac">
      <header class="pac__name">
          <h3>${registeredName}</h3>
      </header>
      <div class="pac__info">
          <div>${address}</div>
      </div>
      <div class="donors-list-wrapper pac__donors">
          <h4>Corporate Donors</h4>
          <ul class="donors-list">
            ${ donors.map(donor => `<li>${donor.company} (${moneyFormatter.format(donor.amount)})</li>`).join('') || 'NONE. This PAC is squeaky clean.'}
          </ul>
      </div>
    </section>
  `;
};