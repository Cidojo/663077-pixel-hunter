import createMarkupNode from './create-markup-node.js';
// import screenSecondGame from './screen-game-2.js';
import renderScreen from './render-screen.js';

import screenStats from './screen-stats.js';


const quiz = {
  paintings: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

const gameType = {
  get level() {
    return this._levels[Math.floor(Math.random() * 3)];
  },
  _levels: [`game-1`, `game-2`, `game-3`],
};


const INITIAL_STATE = Object.freeze({
  stage: 1,
  level: gameType.level,
  lives: 3,
  creationTime: new Date()
});

// const gameState = Object.assign(INITIAL_STATE);


const updateGameStateLevel = (state) => {
  return Object.assign({}, state, {level: gameType.level}, {stage: state.stage + 1});
};


const games = {
  'game-1': {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: new Set([
      {
        order: 1,
        source: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `photo`
      },
      {
        order: 2,
        source: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
      }
    ]),
    answer: {
      type: `PICK`,
      selector: `.game__answer input`
    }
  },
  'game-2': {
    task: `Угадай, фото или рисунок?`,
    options: new Set([
      {
        order: 1,
        source: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `photo`
      }
    ]),
    answer: {
      type: `PICK`,
      selector: `.game__answer input`
    }
  },
  'game-3': {
    task: `Найдите рисунок среди изображений`,
    options: new Set([
      {
        order: 1,
        source: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `photo`
      },
      {
        order: 2,
        source: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
      },
      {
        order: 3,
        source: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      }
    ]),
    answer: {
      type: `FIND`,
      selector: `.game__option`
    }
  }
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
      <img src="${option.source}" alt="Option ${option.order}" width="468" height="458">
      ${game.answer.type === `PICK` ? pickAnswerTemplate(option) : ``}
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

// const screenFirstGame = createMarkupNode(screenTemplate(games[`game-1`]));
// const screenSecondGame = createMarkupNode(screenTemplate(games[`game-2`]));
// const screenThirdGame = createMarkupNode(screenTemplate(games[`game-3`]));

// listeners

  // GAME-1

// const answers1 = Array.from(screenFirstGame.querySelectorAll(`.game__answer input`));

// answers1.forEach((it) => {
//   it.addEventListener(`click`, () => {
//
//     if (isAllAnswersRecieved(answers1)) {
//       renderScreen(screenSecondGame, true, true);
//     }
//
//   });
// });

// GAME-2

// const answers2 = Array.from(screenSecondGame.querySelectorAll(`.game__answer input`));
//
// answers2.forEach((it) => {
//   it.addEventListener(`click`, () => {
//     renderScreen(screenThirdGame, true, true);
//   });
// });

// GAME-3

// const answers3 = Array.from(screenThirdGame.querySelectorAll(`.game__option`));
//
// answers3.forEach((it) => {
//   it.addEventListener(`click`, () => {
//     switchScreen(gameState);
//   });
// });

const setListeners = (screen, currentGame, state) => {
  const answers = Array.from(screen.querySelectorAll(currentGame.answer.selector));

  answers.forEach((it) => {
    it.addEventListener(`click`, () => {
      if (currentGame.answer.type === `FIND`) {
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

    const currentGame = games[newState.level];
    const screen = createMarkupNode(screenTemplate(currentGame));

    setListeners(screen, currentGame, newState);

    renderScreen(screen, true, true);
  }
};


export {screenFirstGame, switchScreen, INITIAL_STATE};
