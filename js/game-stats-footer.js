import {GameSetting, AnswerType} from './game-rules.js';

const statsController = (state) => {
  const statsIcons = [];

  let counter = 0;

  while (state.answers.length && counter < state.answers.length) {
    let current = `unknown`;

    switch (true) {
      case (!state.answers[counter].isCorrect):
        current = AnswerType.WRONG.toLowerCase();
        break;
      case (state.answers[counter].isCorrect):
        current = AnswerType.CORRECT.toLowerCase();
        break;
      case (state.answers[counter].type === AnswerType.FAST):
        current = AnswerType.FAST.toLowerCase();
        break;
      case (state.answers[counter].type === AnswerType.SLOW):
        current = AnswerType.SLOW.toLowerCase();
        break;
    }

    statsIcons.push(`<li class="stats__result stats__result--${current}"></li>`);

    counter++;
  }

  return statsIcons.join(``);
};

export default (state) => {
  const statsTemplate = `
    ${statsController(state)}

    ${new Array(GameSetting.MAX_LEVEL - state.answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
    `;

  const stats = document.createElement(`ul`);
  stats.classList.add(`stats`);
  stats.innerHTML = statsTemplate;

  return stats;
};
