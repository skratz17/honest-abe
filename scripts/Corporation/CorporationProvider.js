let corporations = [];

export const useCorporations = () => corporations.slice();

export const getCorporations = () => {
  return fetch('http://localhost:8088/corporations')
    .then(res => res.json())
    .then(data => corporations = data);
};