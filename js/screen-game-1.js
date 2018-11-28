import createMarkupNode from './create-markup-node.js';
import screenSecondGame from './screen-game-2.js';
import renderScreen from './render-screen.js';


const quiz = {
  paintings: [
    // People
    `https://k42.kn3.net/CF42609C8.jpg`,

    // Animals
    `https://k42.kn3.net/D2F0370D6.jpg`,

    // Nature
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    // People
    `http://i.imgur.com/1KegWPz.jpg`,

    // Animals
    `https://i.imgur.com/DiHM5Zb.jpg`,

    // Nature
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

const INITIAL_STATE = {
  level: 1,
  lives: 3,
  creationTime: new Date()
};

const game = {
  type: 1,
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
  ])
};

const optionTemplate = (order) => `
  <div class="game__option">
    <img src="${order}" alt="Option ${order}" width="468" height="458">
  </div>
`;

const choicesTemplate = (order) => `
  <label class="game__answer game__answer--photo">
    <input class="visually-hidden" name="question${order}" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer game__answer--paint">
    <input class="visually-hidden" name="question${order}" type="radio" value="paint">
    <span>Рисунок</span>
  </label>
`;

const screenTemplate = `
  <section class="game">
    <p class="game__task">${game.task}</p>
    <form class="game__content">

  ${[...game.options].forEach((option, order) => {
    optionTemplate(order);
    choicesTemplate(order);
  })}
    </form>
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
  </section>
`;

// @param {answersArray} nodelist of answers, consequence in pairs (like [photo, paint, photo, paint...])
// $return boolean if all answers has been recieved

const isAllAnswersRecieved = (answersArray) => {
  return answersArray.length / 2 === answersArray.filter((it) => it.checked).length;
};

// creating game-1 node

const screenFirstGame = createMarkupNode(

    const nestElement = document.createElement(`main`);

    nestElement.innerHTML = markup.trim();
    nestElement.classList.add(`central`);

    return nestElement;
  };

);

// listeners

const answers = Array.from(screenFirstGame.querySelectorAll(`.game__answer input`));

answers.forEach((it) => {
  it.addEventListener(`click`, () => {

    if (isAllAnswersRecieved(answers)) {
      renderScreen(screenSecondGame, true, true);
    }

  });
});

export default screenFirstGame;
