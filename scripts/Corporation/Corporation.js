export const Corporation = corporation => {
  const { company, address } = corporation;

  return `
    <section class="corporation">
      <header class="corporation__name">
          <h1>${company}</h1>
      </header>
      <div class="corporation__info">
          <div>${address}</div>
      </div>
    </section>
  `;
};