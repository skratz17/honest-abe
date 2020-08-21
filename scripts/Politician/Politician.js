export const Politician = politician => {
  const { name, age, district } = politician;

  return `
    <section class="politician">
      <header class="politician__name">
          <h3>${name.first} ${name.last}</h3>
      </header>
      <div class="politician__info">
          <div>Age: ${age}</div>
          <div>Represents: ${district}</div>
      </div>
    </section>
  `;
};