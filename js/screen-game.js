import {createMarkupNode} from './utils.js';
import header from './screen-header.js';
import stats from './game-stats-footer.js';
import {checkAnswer} from './data/game-mechanics.js';
import {GAME_KIND} from './data/game-data.js';
import {changeLevel} from './data/game-mechanics.js';
import renderScreen from './render-screen.js';
import screenStats from './screen-stats.js';

const screenGameFun = (state) => {
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
        ${state.game.kind === GAME_KIND.PICK ? pickAnswerTemplate(order) : ``}
      </div>
      `;
    }).join(``);


  const screenTemplate = () => `
    <section class="game">
      <p class="game__task">${state.game.task}</p>
      <form class="game__content">
      ${optionsTemplate(state.game)}
      </form>
    </section>
  `;

  const screenGame = createMarkupNode(screenTemplate());

  screenGame.insertAdjacentElement(`afterbegin`, header(state, true));

  screenGame.querySelector(`section`).appendChild(stats(state));

  const answers = Array.from(screenGame.querySelectorAll(state.game.answerSelector));

  answers.forEach((it) => {
    it.addEventListener(`click`, (evt) => {

      const isCorrect = checkAnswer(answers, evt, state);

      if (isCorrect !== null) {
        state.answers.push(Object.assign({}, {type: `NORMAL`}, {isCorrect}));
        if (state.level === 10) {
          renderScreen(screenStats(state));
        } else {
          renderScreen(screenGameFun(changeLevel(state)));
        }
      }
    });
  });

  return screenGame;
};

export default screenGameFun;
