let pacs = [];

export const usePacs = () => pacs.slice();

export const getPacs = () => {
  return fetch('http://localhost:8088/pacs')
    .then(res => res.json())
    .then(data => pacs = data);
};
