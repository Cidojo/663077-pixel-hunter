import {createMarkupNode} from './utils.js';
import header from './screen-header.js';
import getScores from './logic-getscores.js';
import stats from './game-stats-footer.js';
import {AnswerType, ScoreBonus, GameSetting} from './game-rules.js';

const MockGame1 = {
  lives: 0,
  answers: new Array(GameSetting.MAX_LEVEL)
      .fill({
        isCorrect: true,
        type: `CORRECT`
      })
};

const MockGame2 = {
  lives: 3,
  answers: new Array(GameSetting.MAX_LEVEL)
      .fill({
        isCorrect: true,
        type: `SLOW`
      }, 0, 8)
      .fill({
        isCorrect: true,
        type: `FAST`
      }, 8)
};

const MockGame3 = {
  lives: 0,
  answers: new Array(GameSetting.MAX_LEVEL)
      .fill({
        isCorrect: true,
        type: `CORRECT`
      }, 0, 6)
      .fill({
        isCorrect: false,
        type: `WRONG`
      }, 6)
};

export const MockStats = [
  MockGame1,
  MockGame2,
  MockGame3
];

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
  constructor(game) {
    this.game = game;
    this.livesAmount = game.lives;
    this.correctAmount = game.answers.filter((it) => it.isCorrect).length;
    this.fastAmount = game.answers.filter((it) => it.type === AnswerType.FAST).length;
    this.slowAmount = game.answers.filter((it) => it.type === AnswerType.SLOW).length;
    this.isVictory = this.correctAmount >= GameSetting.MAX_LEVEL - GameSetting.INITIAL_LIVES;
    this.totalScores = getScores(game.answers, game.lives);
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

class GameResultView {
  constructor(model, order) {
    this.model = model;
    this.order = order + 1;
  }

  get template() {
    const lostResult = (model) => `
        <tr>
          <td class="result__number">${this.order}.</td>
          <td>${stats(model.game)}</td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
    `;

    const winResult = (model) => `
        <tr>
          <td class="result__number">${this.order}.</td>
          <td ${model.extraResults.length ? `colspan="2"` : ``}>${stats(model.game)}</td>
          <td class="result__points">× ${ScoreBonus.CORRECT}</td>
          <td class="result__total ${model.extraResults.length ? `` : `result__total--final`}">${model.correctAmount * ScoreBonus.CORRECT}</td>
        </tr>
        ${model.extraResults.length ? `
          ${model.extraResults.map((it) => it.template).join(``)}
            <tr>
              <td colspan="5" class="result__total  result__total--final">${model.totalScores}</td>
            </tr>` : ``}
        `;

    return `
      <table class="result__table">
        ${this.model.isVictory ? winResult(this.model) : lostResult(this.model)}
      </table>
    `;
  }
}


export const screenStats = (state, history) => {
  history.unshift(state);

  const getTable = (game, order) => {
    const result = new GameResult(game);

    return new GameResultView(result, order).template;
  };

  const curentResult = new GameResult(state);

  const screenStatsMarkup = `
    <section class="result">
      <h2 class="result__title">${curentResult.isVictory ? `Победа!` : `Поражение`}</h2>
      ${history.map((it, order) => getTable(it, order)).join(``)}
    </section>
  `;

  const node = createMarkupNode(screenStatsMarkup);

  node.insertAdjacentElement(`afterbegin`, header(state));

  return node;
};
