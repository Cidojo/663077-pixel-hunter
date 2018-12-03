// @param {max} set maximum random value. max is not included
// $return random number from [0 to max);

export const getRandomInteger = (max = 1) => Math.floor(Math.random() * max);

// @param {markup} html string
// $return dom node

export const createMarkupNode = (markup) => {
  const nestElement = document.createElement(`main`);

  nestElement.innerHTML = markup.trim();
  nestElement.classList.add(`central`);

  return nestElement;
};
