export const Corporation = corporation => {
  const { company, address } = corporation;

  return `
    <section class="corporation">
      <header class="corporation__name">
          <h3>${company}</h3>
      </header>
      <div class="corporation__info">
          <div>${address}</div>
      </div>
    </section>
  `;
};