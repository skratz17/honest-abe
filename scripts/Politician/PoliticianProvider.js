let politicians = [];

export const usePoliticians = () => politicians.slice();

export const getPoliticians = () => {
  return fetch('http://localhost:8088/politicians')
    .then(res => res.json())
    .then(data => politicians = data);
};