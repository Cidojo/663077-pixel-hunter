import AbstractView from './abstract-view.js';
import {GameKind} from './data/game-data.js';
import {IMG_FRAME} from './game-rules.js';
import {resizeImg} from './utils.js';
import stats from './game-stats-footer.js';

export default class ScreenGreetingView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
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
        ${stats(this.state)}
      </section>
    `;
  }

  get answers() {
    return Array.from(this.element.querySelectorAll(this.state.game.answerSelector));
  }

  bind() {
    this.answers.forEach((it) => {
      it.addEventListener(`click`, (evt) => {
        this.onNext(this.answers, evt, this.state);
      });
    });
  }

  onNext() {
  }
}
