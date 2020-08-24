let interests = [];

export const useInterests = () => interests.slice();

export const getInterests = () => {
  return fetch('http://localhost:8088/interests')
    .then(res => res.json())
    .then(data => interests = data);
};