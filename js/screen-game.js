import header from './screen-header.js';
import {canContinue, updateState, checkAnswer} from './data/game-mechanics.js';
import {show} from './utils.js';
import screenStats from './screen-stats.js';
import ScreenGameView from './screen-game-view.js';

const tick = (state) => {
  return Object.assign({}, state, {time: state.time + 1});
};

const startTimer = (state) => {
  return setTimeout(() => tick(state), 1000);
};

const stopTimer = (timer) => {
  clearTimeout(timer);
};


const screenGame = (state) => {

  const node = new ScreenGameView(state);

  node.element.insertAdjacentElement(`afterbegin`, header(state).element);

  node.onNext = (evt) => {
    const isCorrect = checkAnswer(node.answers, evt, state);

    if (isCorrect !== null) {
      const newState = updateState(state, isCorrect);
      const next = canContinue(state, isCorrect) ?
        screenGame(newState)
        :
        screenStats(newState);

      show(next.element);
    }
  };

  return node;
};

export default screenGame;
