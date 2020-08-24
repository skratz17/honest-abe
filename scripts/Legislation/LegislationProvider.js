let legislations = [];

export const useLegislations = () => legislations.slice();

export const getLegislations = () => {
  return fetch('http://localhost:8088/legislations')
    .then(res => res.json())
    .then(data => legislations = data);
};