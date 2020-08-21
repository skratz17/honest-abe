let corporateDonations = [];

export const useCorporateDonations = () => corporateDonations.slice();

export const getCorporateDonations = () => {
  return fetch('http://localhost:8088/corporatedonations')
    .then(res => res.json())
    .then(data => corporateDonations = data);
};
