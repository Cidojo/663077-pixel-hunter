import {createMarkupNode, resizeImg} from './utils.js';
import header from './screen-header.js';
import stats from './game-stats-footer.js';
import {GameKind} from './data/game-data.js';
import {canContinue, updateState, checkAnswer} from './data/game-mechanics.js';
import renderScreen from './render-screen.js';
import {screenStats, MockStats} from './screen-stats.js';

import {IMG_FRAME} from './game-rules.js';
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
        <img src="${option.image.source}" alt="Option ${order + 1}" width="${resizeImg(IMG_FRAME, option.image.size).width}" height="${resizeImg(IMG_FRAME, option.image.size).height}">
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

  const answers = Array.from(node.querySelectorAll(state.game.answerSelector));

  answers.forEach((it) => {
    it.addEventListener(`click`, (evt) => {
      const isCorrect = checkAnswer(answers, evt, state);

      if (isCorrect !== null) {
        const newState = updateState(state, isCorrect);
        const next = canContinue(state, isCorrect) ?
          screenGame(newState)
          :
          screenStats(newState, MockStats);

        renderScreen(next);
      }
    });

  });

  return node;
};

const startGame = () => {
  renderScreen(screenGame(Object.assign({}, INITIAL_GAME)));
};

export {startGame, screenGame};
