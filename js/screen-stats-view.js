import AbstractView from './abstract-view.js';
import Application from './application.js';
import {AnswerType, ScoreBonus, GameSetting} from './game-rules.js';
import ScreenStatsBarView from './screen-stats-bar-view.js';
import getScores from './getscores.js';
import ScreenHeaderView from './screen-header-view.js';


const ExtraResultKind = {
  FAST: `FAST`,
  SLOW: `SLOW`,
  ALIVE: `LIVES`
};


const ExtraResultModifacator = {
  [ExtraResultKind.FAST]: `fast`,
  [ExtraResultKind.SLOW]: `slow`,
  [ExtraResultKind.ALIVE]: `alive`
};


const ExtraResultTitle = {
  [ExtraResultKind.FAST]: `Бонус за скорость`,
  [ExtraResultKind.SLOW]: `Штраф за медлительность`,
  [ExtraResultKind.ALIVE]: `Бонус за жизни`
};


class GameResult {
  constructor(resultState) {
    this.game = resultState;
    this.livesAmount = resultState.lives;
    this.correctAmount = resultState.answers.filter((it) => it.isCorrect).length;
    this.fastAmount = resultState.answers.filter((it) => it.type === AnswerType.FAST).length;
    this.slowAmount = resultState.answers.filter((it) => it.type === AnswerType.SLOW).length;
    this.isVictory = this.correctAmount >= GameSetting.MAX_LEVEL - GameSetting.INITIAL_LIVES;
    this.totalScores = getScores(resultState.answers, resultState.lives);
  }

  get extraResults() {
    const extra = [];
    if (this.fastAmount) {
      extra.push(new Extra(ExtraResultKind.FAST, this));
    }
    if (this.livesAmount) {
      extra.push(new Extra(ExtraResultKind.ALIVE, this));
    }
    if (this.slowAmount) {
      extra.push(new Extra(ExtraResultKind.SLOW, this));
    }

    return extra;
  }
}


class Extra {
  constructor(extraResultKind, result) {
    this.kind = extraResultKind;
    this.title = ExtraResultTitle[extraResultKind];
    this.bonus = ScoreBonus[extraResultKind];
    this.quantity = result[extraResultKind.toLowerCase() + `Amount`];
    this.modificator = ExtraResultModifacator[this.kind];
  }

  get template() {
    return `
      <tr>
        <td></td>
        <td class="result__extra">${this.title}:</td>
        <td class="result__extra">${this.quantity} <span class="stats__result stats__result--${this.modificator}"></span></td>
        <td class="result__points">× ${Math.abs(this.bonus)}</td>
        <td class="result__total">${this.quantity * this.bonus}</td>
      </tr>
    `;
  }
}


const domContainer = {
  tagName: `table`,
  id: null,
  classList: [`result__table`]
};

class ResultTable extends AbstractView {
  constructor(resultState, order) {
    super();
    this.resultState = resultState;
    this.result = new GameResult(this.resultState);
    this.order = order + 1;
    this.statsBar = new ScreenStatsBarView(resultState);
    this.render = this.render.bind(this, domContainer);
  }

  get template() {
    const lostResult = () => `
        <tr>
          <td class="result__number">${this.order}.</td>
          <td>
            <ul class="stats">${this.statsBar.template}</ul>
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
    `;

    const winResult = () => `
        <tr>
          <td class="result__number">${this.order}.</td>
          <td ${this.result.extraResults.length ? `colspan="2"` : ``}>
            <ul class="stats">${this.statsBar.template}</ul>
          </td>
          <td class="result__points">× ${ScoreBonus.CORRECT}</td>
          <td class="result__total ${this.result.extraResults.length ? `` : `result__total--final`}">${this.result.correctAmount * ScoreBonus.CORRECT}</td>
        </tr>
        ${this.result.extraResults.length ? `
          ${this.result.extraResults.map((it) => it.template).join(``)}
            <tr>
              <td colspan="5" class="result__total  result__total--final">${this.result.totalScores}</td>
            </tr>` : ``}
        `;

    return this.result.isVictory ? winResult() : lostResult();
  }
}


export default class ScreenStatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    // this.history = history;
    // this.history.unshift(this.state);
    // this.results = this.history.map((resultState, order) => new ResultTable(resultState, order));
    this.header = new ScreenHeaderView();
    this.header.goHome = () => Application.showGreeting();
    this.addHeader(this.header.element);
  }

  get template() {
    return `
      <section class="result">
      <h2 class="result__title">${true ? `Победа!` : `Поражение`}</h2>
      </section>
    `;
    // <h2 class="result__title">${this.results[0].result.isVictory ? `Победа!` : `Поражение`}</h2>
  }

  addResults(data) {
    const results = data.map((resultState, order) => new ResultTable(resultState, order));
    results.forEach((it) => this.element.lastChild.appendChild(it.element));
  }

  addHeader(header) {
    this.element.insertAdjacentElement(`afterbegin`, header);
  }
  // showScores(data) {
  //   this.history = data;
  // }
}
