// @param {max} set maximum random value. max is not included
// $return random number from [0 to max);

export const getRandomInteger = (max) => Math.floor(Math.random() * max + 1);
