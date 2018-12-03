import createMarkupNode from './create-markup-node.js';
import renderScreen from './render-screen.js';


export default (state) => {
  const headerBackButtonMarkup = () => `
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


  const headerStateMarkup = () =>`
    <div class="game__timer">NN</div>
    <div class="game__lives">
    <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
    <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
  `;


  const markup = `
    <header class="header">
      ${state.screen.isHeaderBackButton ? headerBackButtonMarkup() : ``}
      ${state.screen.isHeaderState ? headerStateMarkup() : ``}
    </header>
`;


  const header = createMarkupNode(markup);

  header.querySelector(`.back`).addEventListener(`click`, () => {
    renderScreen(state.home);
  });

  return header;
};
