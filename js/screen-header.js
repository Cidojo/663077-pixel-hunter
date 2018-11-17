import createMarkupNode from './create-markup-node.js';
import screenGreeting from './screen-greeting.js';
import renderScreen from './render-screen.js';

const headerCommonMarkup = `
  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>
`;

const headerMiscMarkup = `
    <div class="game__timer">NN</div>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
`;

// @param {nodes} any object or nodelist to get nodes from
// $return array of nodes from {nodes}

const createNodeCollection = (nodes) => {
  let count = 0;
  const collection = [];

  while (count < nodes.length) {
    collection.push(nodes[count]);
    count++;
  }

  return collection;
};

// @param {misc} boolean, true is header include misc info (life, timer, etc.)
// $return header fragment

const insertHeader = (misc) => {
  const fragment = document.createDocumentFragment();

  let i = 0;

  while (i < headerCommonCollection.length) {
    fragment.appendChild(headerCommonCollection[i]);
    i++;
  }

  if (misc) {
    let j = 0;

    while (j < headerMiscCollection.length) {
      fragment.firstChild.appendChild(headerMiscCollection[j]);
      j++;
    }
  }

  return fragment;
};

// creating header nodes

const headerCommon = createMarkupNode(headerCommonMarkup);
const headerMisc = createMarkupNode(headerMiscMarkup);

// collecting shared nodes into array

const headerCommonCollection = createNodeCollection(headerCommon.children);
const headerMiscCollection = createNodeCollection(headerMisc.children);

// listener

const returnToGreetingButton = headerCommon.querySelector(`.back`);

returnToGreetingButton.addEventListener(`click`, () => {
  renderScreen(screenGreeting);
});

export default insertHeader;
