import AbstractView from './abstract-view.js';
import {GameSetting} from './game-rules.js';


const domContainer = {
  TAG: `header`,
  CLASS_LIST: [`header`]
};

const homeScreenButtonClass = `.back`;

export default class ScreenHeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;

    this.render = this.render.bind(this, domContainer);
  }

  get template() {
    return `
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>

      ${this.state ? `
        <div class="game__timer">${this.state.time}</div>
        <div class="game__lives">
          ${new Array(GameSetting.INITIAL_LIVES - this.state.lives)
            .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`)
            .join(``)}
          ${new Array(this.state.lives)
            .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
            .join(``)}
        </div>` : ``}
    `;
  }

  bind(screen) {
    const homeScreenButton = screen.querySelector(homeScreenButtonClass);

    homeScreenButton.addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      this.showHomeScreen();
    });
  }

  showHomeScreen() {
  }
}