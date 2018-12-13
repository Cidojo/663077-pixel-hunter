import {createMarkupNode} from './utils.js';
import header from './screen-header.js';
import stats from './game-stats-footer.js';
import {checkAnswer, reapLife} from './data/game-mechanics.js';
import {GameKind} from './data/game-data.js';
import {changeLevel} from './data/game-mechanics.js';
import renderScreen from './render-screen.js';
import {screenStats, MockStats} from './screen-stats.js';
import {UserAnswer} from './game-rules.js';

import {INITIAL_GAME} from './data/game-mechanics.js';

const screenGame = (state) => {
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
    [...state.game.options].map((option, order) => {
      return `
      <div class="game__option">
        <img src="${option.source}" alt="Option ${order + 1}" width="468" height="458">
        ${state.game.kind === GameKind.PICK ? pickAnswerTemplate(order) : ``}
      </div>
      `;
    }).join(``);


  const screenTemplate = () => `
    <section class="game">
      <p class="game__task">${state.game.task}</p>
      <form class="game__content">
      ${optionsTemplate(state.game)}
      </form>
      ${stats(state)}
    </section>
  `;

  const node = createMarkupNode(screenTemplate());

  node.insertAdjacentElement(`afterbegin`, header(state, true));

  // node.querySelector(`section`).appendChild(stats(state));

  const answers = Array.from(node.querySelectorAll(state.game.answerSelector));

  answers.forEach((it) => {
    it.addEventListener(`click`, (evt) => {
      const canContinue = (currentState) => {
        return !(currentState.lives - 1 < 0);
      };
      const isLast = (currentState) => {
        return currentState.level + 1 > 10;
      };

      const isCorrect = checkAnswer(answers, evt, state);

      if (isCorrect !== null) {
        state.answers.push(new UserAnswer(isCorrect, state.time));

        if (isLast(state)) {
          renderScreen(screenStats(state, MockStats));
        } else {
          if (!isCorrect && !canContinue(state)) {
            renderScreen(screenStats(state, MockStats));
          } else {
            renderScreen(screenGame(changeLevel(isCorrect ? state : reapLife(state))));
          }
        }
      }
    });

  });

  return node;
};

const startGame = () => {
  renderScreen(screenGame(Object.assign({}, INITIAL_GAME)));
};

export default startGame;
