let politicianLegislations = [];

export const usePoliticianLegislations = () => politicianLegislations.slice();

export const getPoliticianLegislations = () => {
  return fetch('http://localhost:8088/politicianLegislations')
    .then(res => res.json())
    .then(data => politicianLegislations = data);
};