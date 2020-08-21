export const Politician = politician => {
  const { name, age, district } = politician;

  return `
    <section class="politician">
      <header class="politician__name">
          <h2>${name.first} ${name.last}</h2>
      </header>
      <div class="politician__info">
          <div>Age: ${age}</div>
          <div>Represents: ${district}</div>
      </div>
    </section>
  `;
};