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

const isAllAnswersRecieved = (answersArray) => {
  return answersArray.length / 2 === answersArray.filter((it) => it.checked).length;
};


const setListeners = (screen, currentGame, state) => {
  const answers = Array.from(screen.querySelectorAll(currentGame.answerSelector));
  // const currentGameAnswers = [];

  answers.forEach((it) => {
    it.addEventListener(`click`, () => {
      const result = {
        type: `NORMAL`
      };

      let isCorrect = false;


      if (currentGame.kind === GAME_KIND.FIND) {


        switchScreen(state);
      } else if (isAllAnswersRecieved(answers)) {
        const answersValues = answers.filter((input) => input.checked).map((input) => input.value);

        if (state.game.answers.every((current, index) => answersValues[index] === current)) {
          isCorrect = true;
        }

      }

      state.answers.push(Object.assign({}, result, {isCorrect}));
      // debugger
      switchScreen(state);
    });
  });
};


const switchScreen = (state) => {
  const newState = changeLevel(state);

  console.log(JSON.stringify(state.answers));

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
