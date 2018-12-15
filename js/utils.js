// @param {max} set maximum random value. max is not included
// $return random number from [0 to max);

export const getRandomInteger = (max) => Math.floor(Math.random() * max + 1);


// @param {markup} html string
// $return dom node

export const createMarkupNode = (markup) => {
  const nestElement = document.createElement(`main`);

  nestElement.innerHTML = markup.trim();
  nestElement.classList.add(`central`);

  return nestElement;
};


// @param {frame} object, frame to resize into
// @param {given} object, given img to resize
// $result new object with changed img sizes

export const resizeImg = (frame, given) => {
  const [base, heep] = Object.entries(given)
    .sort((current, next) => next.pop() - current.pop())
    .map((it) => it.shift());

  const frameBase = given[base] === given[heep] ?
    Object.entries(frame)
      .reduce((current, next) => current.pop() <= next.pop() ? current : next)
      .pop()
    : base;

  const multiplier = frame[frameBase] / given[base];

  return {[base]: frame[frameBase], [heep]: given[heep] * multiplier};
};
