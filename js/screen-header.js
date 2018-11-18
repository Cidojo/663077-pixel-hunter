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

// @param {misc} boolean, true is header include misc info (life, timer, etc.)
// $return header fragment

const insertHeader = (misc) => {
  const fragment = document.createDocumentFragment();

  fragment.append(...headerCommonCollection);

  if (misc) {
    fragment.firstChild.append(...headerMiscCollection);
  }

  return fragment;
};

// creating header nodes

const headerCommon = createMarkupNode(headerCommonMarkup);
const headerMisc = createMarkupNode(headerMiscMarkup);

// storing HTMLCollection

const headerCommonCollection = [...headerCommon.children];
const headerMiscCollection = [...headerMisc.children];

// listener

const returnToGreetingButton = headerCommon.querySelector(`.back`);

returnToGreetingButton.addEventListener(`click`, () => {
  renderScreen(screenGreeting);
});

export default insertHeader;
