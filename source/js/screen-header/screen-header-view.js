import AbstractView from './../abstract-view/abstract-view.js';
import {GameSetting} from './../data/game-setting.js';


const Blink = {
  INTERVAL: 250,
  START_TIME: 5
};


const HOME_SCREEN_BUTTON_CLASS = `.back`;


const OpacityEdge = {
  FULL: 100,
  ZERO: 0
};


const domContainer = {
  tagName: `header`,
  id: null,
  classList: [`header`]
};


export default class ScreenHeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.render = this.render.bind(this, domContainer);
    if (state) {
      this._timerHolder = this.element.querySelector(`.game__timer`);
    }
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
    const homeScreenButton = screen.querySelector(HOME_SCREEN_BUTTON_CLASS);

    homeScreenButton.addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      this.goHome();
    });
  }

  goHome() {
  }

  updateTimer(state) {
    this.state = state;
    this._timerHolder.textContent = this.state.time;

    if (this.state.time <= Blink.START_TIME) {
      this.startBlinking();
    }
  }

  startBlinking() {
    if (!this.state.time) {
      clearInterval(this.blinkTimer);
    } else {
      clearInterval(this.blinkTimer);
      this.blinkTimer = setInterval(() => {
        this._timerHolder.style.opacity = +this._timerHolder.style.opacity ? OpacityEdge.ZERO : OpacityEdge.FULL;
      }, Blink.INTERVAL);
    }
  }
}
