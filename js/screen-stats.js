import {createMarkupNode} from './utils.js';
import header from './screen-header.js';
import getScores from './logic-getscores.js';
import stats from './game-stats-footer.js';
import {AnswerType, ScoreBonus} from './game-rules.js';

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
    this.victory = this.lives >= 0;
    this.scores = getScores(state.answers, state.lives);
  }
}

export default (state) => {
  const result = new ResultStats(state);

  class Extra {
    constructor(type) {
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

  const screenStatsMarkup = `
    <section class="result">
      <h2 class="result__title">${result.victory ? `Победа!` : `Поражение`}</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${stats(state)}
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">${result.correct * ScoreBonus.CORRECT}</td>
        </tr>
        ${result.fast ? new Extra(ExtraResult.FAST).template : ``}
        ${result.lives ? new Extra(ExtraResult.ALIVE).template : ``}
        ${result.slow ? new Extra(ExtraResult.SLOW).template : ``}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${getScores(state.answers, state.lives) === -1 ? `FAIL` : getScores(state.answers, state.lives)}</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td>
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--wrong"></li>
            </ul>
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">3.</td>
          <td colspan="2">
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--unknown"></li>
            </ul>
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">900</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">100</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">950</td>
        </tr>
      </table>
    </section>
  `;

  const node = createMarkupNode(screenStatsMarkup);

  node.insertAdjacentElement(`afterbegin`, header(state));

  return node;
};
