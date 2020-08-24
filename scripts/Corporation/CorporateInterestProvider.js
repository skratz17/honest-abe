let corporateInterests = [];

export const useCorporateInterests = () => corporateInterests.slice();

export const getCorporateInterests = () => {
  return fetch('http://localhost:8088/corporateInterests')
    .then(res => res.json())
    .then(data => corporateInterests = data);
};
