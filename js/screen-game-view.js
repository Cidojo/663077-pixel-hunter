import AbstractView from './abstract-view.js';
import {GameKind} from './data/game-data.js';
import {IMG_FRAME} from './game-rules.js';
import resizeImg from './resize-img.js';
import ScreenHeader from './screen-header.js';
import ScreenStatsBarView from './screen-stats-bar-view.js';

export default class ScreenGameView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.header = new ScreenHeader(this.state);
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
          <img src="${option.image.source}" alt="Option ${order + 1}" width="${resizeImg(IMG_FRAME, option.image.size).width}" height="${resizeImg(IMG_FRAME, option.image.size).height}">
          ${this.state.game.kind === GameKind.PICK ? pickAnswerTemplate(order) : ``}
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

    this.header.root.updateTimer(state);
    // const header = new ScreenHeader(this.state);
    // this.element.replaceChild(header.element, this.header.element);
    // this.header = header;
  }

  bind() {
    this.answers.forEach((it) => {
      it.addEventListener(`click`, (evt) => {
        this.onAnswer(evt.currentTarget);
      });
    });
  }

  onAnswer() {
  }
}
