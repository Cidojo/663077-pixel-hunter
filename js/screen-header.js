import {GameSetting} from './game-rules.js';
import renderScreen from './render-screen.js';
import screenGreeting from './screen-greeting.js';

export default (state, isFull) => {
  const headerMarkup = `
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>

    ${isFull ? `
      <div class="game__timer">NN</div>
      <div class="game__lives">
        ${new Array(GameSetting.INITIAL_LIVES - state.lives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
        ${new Array(state.lives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
      </div>` : ``}
  `;

  const header = document.createElement(`header`);
  header.classList.add(`header`);
  header.innerHTML = headerMarkup;

  header.querySelector(`.back`).addEventListener(`click`, () => {
    renderScreen(screenGreeting());
  });

  return header;
};
