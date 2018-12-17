import header from './screen-header.js';
import {canContinue, updateState, checkAnswer} from './data/game-mechanics.js';
import show from './render-screen.js';
import screenStats from './screen-stats.js';
import ScreenGameView from './screen-game-view.js';

const screenGame = (state) => {

  const node = new ScreenGameView(state);

  node.element.insertAdjacentElement(`afterbegin`, header(state).element);

  node.onNext = (answers, evt, currentState) => {
    const isCorrect = checkAnswer(answers, evt, currentState);

    if (isCorrect !== null) {
      const newState = updateState(currentState, isCorrect);
      const next = canContinue(currentState, isCorrect) ?
        screenGame(newState)
        :
        screenStats(newState);

      show(next.element);
    }
  };

  return node;
};

export default screenGame;
