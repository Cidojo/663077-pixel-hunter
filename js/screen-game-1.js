import createMarkupNode from './create-markup-node.js';
// import screenSecondGame from './screen-game-2.js';
import renderScreen from './render-screen.js';

import screenStats from './screen-stats.js';
import {changeLevel} from './data/quiz.js';
import {quiz, GAME_KIND} from './data/quiz-data.js';

const pickAnswerTemplate = (option, order) => `
  <label class="game__answer game__answer--photo">
    <input class="visually-hidden" name="question${order + 1}" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer game__answer--paint">
    <input class="visually-hidden" name="question${order + 1}" type="radio" value="paint">
    <span>Рисунок</span>
  </label>
`;

const optionsTemplate = (game) =>
  [...game.options].map((option, order) => {
    return `
    <div class="game__option">
      <img src="${option.source}" alt="Option ${order + 1}" width="468" height="458">
      ${game.kind === GAME_KIND.PICK ? pickAnswerTemplate(option, order) : ``}
    </div>
    `;
  }).join(``);


const statsTemplate = (game) => `
  <ul class="stats">
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
  </ul>
`;

const screenTemplate = (game) => `
  <section class="game">
    <p class="game__task">${game.task}</p>
    <form class="game__content">
    ${optionsTemplate(game)}
    </form>
    ${statsTemplate(game)}
  </section>
`;


// const updateGameState = (state) => {
//   return Object.assign({}, state, {type: quiz.randomType}, {stage: state.stage + 1});
// };

// @param {answersArray} nodelist of answers, consequence in pairs (like [photo, paint, photo, paint...])
// $return boolean if all answers has been recieved

const setListeners = (screen, currentGame, state) => {
  const answers = Array.from(screen.querySelectorAll(currentGame.answerSelector));

  answers.forEach((it) => {
    it.addEventListener(`click`, (evt) => {

      let isCorrect;
      let userAnswers;

      if (currentGame.kind === GAME_KIND.FIND) {

        userAnswers = [answers.indexOf(evt.currentTarget)];

        // isCorrect = !state.game.answers.some((element, self) => element === state.game.answers[answers.indexOf(evt.currentTarget)] && self !== answers.indexOf(evt.currentTarget));

      } else if (currentGame.kind === GAME_KIND.PICK) {
        userAnswers = answers.filter((element) => element.checked).map((input) => input.value);

        // isCorrect = userAnswers.length === state.game.answers.length ? state.game.answers.every((gameAnswer, index) => userAnswers[index] === gameAnswer) : null;
      }

      isCorrect = userAnswers.length === state.game.answers.length ? state.game.answers.every((gameAnswer, index) => userAnswers[index] === gameAnswer) : null;

      if (isCorrect !== null) {
        state.answers.push(Object.assign({}, {type: `NORMAL`}, {isCorrect}));
        switchScreen(state);
      }
    });
  });
};


const switchScreen = (state) => {
  const newState = changeLevel(state);

  if (newState.level === 10) {
    renderScreen(screenStats, true);
  } else {

    // const currentGame = quiz[newState.type];
    const currentGame = newState.game;
    const screen = createMarkupNode(screenTemplate(currentGame));

    setListeners(screen, currentGame, newState);

    renderScreen(screen, true, true);
  }
};


export {switchScreen};
