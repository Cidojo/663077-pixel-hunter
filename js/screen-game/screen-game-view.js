import AbstractView from './../abstract-view/abstract-view.js';
import {GameKind} from './../data/game-data.js';
import ScreenHeaderView from './../screen-header/screen-header-view.js';
import ScreenStatsBarView from './../screen-stats-bar/screen-stats-bar-view.js';
import {isDebugMode} from './../data/game-setting.js';


export default class ScreenGameView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.header = new ScreenHeaderView(this.state);

    this.header.goHome = () => {
      this.onHomeButtonClick();
    };

    this.statsBar = new ScreenStatsBarView(this.state);
    this.addHeader(this.header.element);
    this.addFooter(this.statsBar.element);
  }

  get template() {
    const pickAnswerTemplate = (order) => `
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question${order + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question${order + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    `;

    const optionsTemplate = () =>
      [...this.state.game.options].map((option, order) => {

        return `
        <div class="game__option">
          ${isDebugMode() ? `<div style="font-size: 20px;">${option.type}</div>` : ``}
          <img src="${option.image.source}" alt="Option ${order + 1}" width="0" height="0">
          ${this.state.game.kind !== GameKind.ONE_OF_THREE ? pickAnswerTemplate(order) : ``}
        </div>
        `;
      }).join(``);


    return `
      <section class="game">
        <p class="game__task">${this.state.game.task}</p>
        <form class="game__content">
        ${optionsTemplate(this.state.game)}
        </form>
      </section>
    `;
  }

  updateState(updatedState) {
    this.state = updatedState;
  }

  get answers() {
    return Array.from(this.element.querySelectorAll(this.state.game.answerSelector));
  }

  addHeader(header) {
    this.element.insertAdjacentElement(`afterbegin`, header);
  }

  addFooter(statsBar) {
    this.element.lastChild.appendChild(statsBar);
  }

  updateHeader(state) {
    this.updateState(state);

    this.header.updateTimer(state);
  }

  bind() {
    this.answers.forEach((it) => {
      it.addEventListener(`click`, (evt) => {
        this.onAnswer(evt.currentTarget);
      });
    });


    const imgContainers = this.element.querySelectorAll(`.game__option`);
    const images = this.element.querySelectorAll(`.game__option img`);

    images.forEach((it, index) => {
      it.addEventListener(`load`, () => {
        this.onImgLoad(it, index, imgContainers[index]);
      }, {once: true});
    });
  }

  onAnswer() {
  }
  onImgLoad() {
  }
  onHomeButtonClick() {
  }
}
