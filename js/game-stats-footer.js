import {GameSetting} from './game-rules.js';

export default (state) => {
  return `
    <ul class="stats">
      ${state.answers
        .map((it) => {
          return `<li class="stats__result stats__result--${it.type.toLowerCase()}"></li>`;
        }).join(``)}

      ${new Array(GameSetting.MAX_LEVEL - state.answers.length)
        .fill(`<li class="stats__result stats__result--unknown"></li>`)
        .join(``)}
    </ul>
    `;
};
