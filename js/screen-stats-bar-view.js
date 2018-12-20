import AbstractView from './abstract-view.js';
import {GameSetting} from './game-rules.js';

const domContainer = {
  tagName: `ul`,
  id: null,
  classList: [`stats`]
};

export default class ScreenStatsBar extends AbstractView {
  constructor(state) {
    super();
    this.state = state;

    this.render = this.render.bind(this, domContainer);
  }

  get template() {
    return `
        ${this.state.answers
          .map((it) => {
            return `<li class="stats__result stats__result--${it.type.toLowerCase()}"></li>`;
          }).join(``)}

        ${new Array(GameSetting.MAX_LEVEL - this.state.answers.length)
          .fill(`<li class="stats__result stats__result--unknown"></li>`)
          .join(``)}
      `;
  }
}
