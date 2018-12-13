import {createMarkupNode} from './utils.js';
import header from './screen-header.js';
import getScores from './logic-getscores.js';
import stats from './game-stats-footer.js';
import {AnswerType, ScoreBonus, GameSetting} from './game-rules.js';

const ExtraResult = {
  FAST: `FAST`,
  SLOW: `SLOW`,
  ALIVE: `LIVES`
};

const ExtraResultModifacators = {
  [ExtraResult.FAST]: `fast`,
  [ExtraResult.SLOW]: `slow`,
  [ExtraResult.ALIVE]: `alive`
};

const ExtraResultTitle = {
  [ExtraResult.FAST]: `Бонус за скорость`,
  [ExtraResult.SLOW]: `Штраф за медлительность`,
  [ExtraResult.ALIVE]: `Бонус за жизни`
};

class ResultStats {
  constructor(state) {
    this.lives = state.lives;
    this.correct = state.answers.filter((it) => it.isCorrect).length;
    this.fast = state.answers.filter((it) => it.type === AnswerType.FAST).length;
    this.slow = state.answers.filter((it) => it.type === AnswerType.SLOW).length;
    this.victory = this.correct >= GameSetting.MAX_LEVEL - GameSetting.INITIAL_LIVES;
    this.scores = getScores(state.answers, state.lives);
  }
}

const MockGame = {
  lives: 2,
  answers: new Array(10).fill({isCorrect: true, type: `FAST`})
};

export const MockStats = [
  MockGame,
  MockGame
];

export const screenStats = (state, history) => {
  history.unshift(state);

  class Extra {
    constructor(type, result) {
      this.kind = type;
      this.title = ExtraResultTitle[type];
      this.bonus = ScoreBonus[type];
      this.quantity = result[type.toLowerCase()];
    }

    get template() {
      return `
        <tr>
          <td></td>
          <td class="result__extra">${this.title}:</td>
          <td class="result__extra">${this.quantity} <span class="stats__result stats__result--${ExtraResultModifacators.type}"></span></td>
          <td class="result__points">× ${Math.abs(this.bonus)}</td>
          <td class="result__total">${this.quantity * this.bonus}</td>
        </tr>
      `;
    }
  }

  const getTable = (game, order) => {
    const result = new ResultStats(game);

    return (result.victory && (result.fast || result.lives || result.slow)) ?
      `<table class="result__table">
        <tr>
          <td class="result__number">${order + 1}.</td>
          <td colspan="2">
            ${stats(game)}
          </td>
          <td class="result__points">× ${ScoreBonus.CORRECT}</td>
          <td class="result__total">${result.correct * ScoreBonus.CORRECT}</td>
        </tr>
        ${result.fast ? new Extra(ExtraResult.FAST, result).template : ``}
        ${result.lives ? new Extra(ExtraResult.ALIVE, result).template : ``}
        ${result.slow ? new Extra(ExtraResult.SLOW, result).template : ``}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${result.scores}</td>
        </tr>
      </table>`
      :
      `<table class="result__table">
        <tr>
          <td class="result__number">${order + 1}.</td>
          <td>
            ${stats(game)}
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">${result.victory ? getScores(game.answers, game.lives) : `fail`}</td>
        </tr>
      </table>`;
  };

  const curentResult = new ResultStats(state);

  const screenStatsMarkup = `
    <section class="result">
      <h2 class="result__title">${curentResult.victory ? `Победа!` : `Поражение`}</h2>
      ${history.map((it, order) => getTable(it, order)).join(``)}
    </section>
  `;

  const node = createMarkupNode(screenStatsMarkup);

  node.insertAdjacentElement(`afterbegin`, header(state));

  return node;
};
