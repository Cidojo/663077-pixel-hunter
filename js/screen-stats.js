import {createMarkupNode} from './utils.js';
import header from './screen-header.js';
import getScores from './logic-getscores.js';
import stats from './game-stats-footer.js';

export default (state) => {
  const screenStatsMarkup = `
    <section class="result">
      <h2 class="result__title">${state.lives < 0 || state.answers.length < 10 ? `Поражение` : `Победа!`}</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">${state.answers.slice().filter((it) => it.isCorrect).length * 100}</td>
        </tr>
        ${state.answers.slice().filter((it) => it.type === `FAST`).length ? `
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">${state.answers.slice().filter((it) => it.type === `FAST`).length} <span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">${state.answers.slice().filter((it) => it.type === `FAST`).length * 50}</td>
          </tr>` : ``}
        ${state.lives ? `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${state.lives}<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${state.lives * 50}</td>
        </tr>` : ``}
        ${state.answers.slice().filter((it) => it.type === `SLOW`).length ? `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${state.answers.slice().filter((it) => it.type === `SLOW`).length} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">-${state.answers.slice().filter((it) => it.type === `SLOW`).length * 50}</td>
        </tr>` : ``}
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
  const results = node.querySelectorAll(`td[colspan="2"]`);

  results[0].appendChild(stats(state));

  node.insertAdjacentElement(`afterbegin`, header(state));

  return node;
};
