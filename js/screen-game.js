import {createUserAnswer} from './data/game-mechanics.js';
import {show} from './utils.js';
import ScreenGameView from './screen-game-view.js';
import screenStats from './screen-stats.js';
import {GameKind} from './data/game-data.js';
import {stopTimer} from './timer.js';


const checkUserAnswer = (userAnswers, correctAnswers) => {
  return userAnswers.length === correctAnswers.length ?
    correctAnswers.every((gameAnswer, index) => userAnswers[index] === gameAnswer)
    :
    null;
};


// @param {answers} user answers from current screen
// @param {evt} click event
// @param {state} current state object
// $return null if not all answers have been recieved, else returns boolean value if correct or not

const getUserAnswers = (possibleAnswers, userAnswer, state) => {

  return state.game.kind === GameKind.FIND ?
    [possibleAnswers.indexOf(userAnswer)]
    :
    possibleAnswers.filter((element) => element.checked).map((input) => input.value);
};


class ScreenGame {
  constructor(model) {
    this.model = model;
    this.root = new ScreenGameView(this.model.state);
    this._timer = null;
  }

  get element() {
    return this.root.element;
  }

  stopGame() {
    stopTimer(this._timer);
  }

  _tick() {
    this.model.tick();
    this.root.updateHeader(this.model.state);

    if (this.model.state.time === 0) {
      this.onTimeout();
    } else {
      this._timer = setTimeout(() => this._tick(), 1000);
    }
  }

  startGame() {
    this.changeLevel();
    show(this.root.element);
    this._tick();
  }

  changeLevel() {
    this.model.nextLevel();
    this.root = new ScreenGameView(this.model.state);

    this.root.onAnswer = (userAnswer) => {
      const isCorrect = checkUserAnswer(getUserAnswers(this.root.answers, userAnswer, this.model.state), this.model.state.game.answers);

      if (isCorrect !== null) {
        this.answer(createUserAnswer(isCorrect, this.model.state.time));
      }
    };
  }

  answer(answer) {

    if (answer !== null) {
      this.stopGame();
      this.model.addUserAnswer(answer);
      if (!answer.isCorrect) {
        this.model.reapLife();
      }
      if (this.model.canContinue()) {
        this.startGame();
      } else {
        show(screenStats(this.model.state).element);
      }
    }
  }

  onTimeout() {
    this.answer(createUserAnswer(false, 0));
  }
}


export default ScreenGame;
