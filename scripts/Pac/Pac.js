export const Pac = pac => {
  const { registeredName, address } = pac;

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
            <!-- map here -->
          </ul>
      </div>
    </section>
  `;
};