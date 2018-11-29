import createMarkupNode from './create-markup-node.js';
// import screenSecondGame from './screen-game-2.js';
import renderScreen from './render-screen.js';

import screenStats from './screen-stats.js';
import {getRandomInteger} from './utils.js';
import {quiz, KIND} from './data/quiz-data.js';


const INITIAL_GAME = Object.freeze({
  stage: 1,
  type: 1,
  //  magic?
  lives: 3,
  creationTime: new Date()
});


const updateGameStateLevel = (state) => {
  return Object.assign({}, state, {type: getRandomInteger(Object.keys(quiz).length) + 1}, {stage: state.stage + 1});
};

const pickAnswerTemplate = (option) => `
  <label class="game__answer game__answer--photo">
    <input class="visually-hidden" name="question${option.order}" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer game__answer--paint">
    <input class="visually-hidden" name="question${option.order}" type="radio" value="paint">
    <span>Рисунок</span>
  </label>
`;

const optionsTemplate = (game) =>
  [...game.options].map((option) => {
    return `
    <div class="game__option">
      <img src="${option.source}" alt="Option ${option.order}" width="468" height="458" style="background-size: cover;">
      ${game.kind === KIND.PICK ? pickAnswerTemplate(option) : ``}
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


// @param {answersArray} nodelist of answers, consequence in pairs (like [photo, paint, photo, paint...])
// $return boolean if all answers has been recieved

const isAllAnswersRecieved = (answersArray) => {
  return answersArray.length / 2 === answersArray.filter((it) => it.checked).length;
};


const setListeners = (screen, currentGame, state) => {
  const answers = Array.from(screen.querySelectorAll(currentGame.answer.selector));

  answers.forEach((it) => {
    it.addEventListener(`click`, () => {
      if (currentGame.kind === KIND.FIND) {
        switchScreen(state);
      } else if (isAllAnswersRecieved(answers)) {
        switchScreen(state);
      }
    });
  });
};

const switchScreen = (state) => {
  const newState = updateGameStateLevel(state);

  if (newState.stage > 10) {
    renderScreen(screenStats, true);
  } else {

    const currentGame = quiz[`game-` + newState.type];
    const screen = createMarkupNode(screenTemplate(currentGame));

    setListeners(screen, currentGame, newState);

    renderScreen(screen, true, true);
  }
};


export {switchScreen, INITIAL_GAME};
