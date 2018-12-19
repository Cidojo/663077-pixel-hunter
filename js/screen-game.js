// import header from './screen-header.js';
import {canContinue} from './data/game-mechanics.js';
import {TimeLine, AnswerType} from './game-rules.js';
import {show} from './utils.js';
import screenStats from './screen-stats.js';
import ScreenGameView from './screen-game-view.js';
import {GameKind} from './data/game-data.js';
import {startTimer, stopTimer} from './timer.js';
import ScreenHeader from './screen-header.js';


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
    this.header = new ScreenHeader(this.model.state).element;
    this.root.element.insertAdjacentElement(`afterbegin`, this.header);

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
    this.updateHeader();

    this._timer = setTimeout(() => this._tick(), 1000);
  }

  startGame() {
    this.changeLevel();
    show(this.root.element);
    this._tick();
  }

  changeLevel() {
    this.model.nextLevel();
    this.root = new ScreenGameView(this.model.state);
    this.root.element.insertAdjacentElement(`afterbegin`, this.header);

    this.root.onAnswer = (userAnswer) => {
      const isCorrect = checkUserAnswer(getUserAnswers(this.root.answers, userAnswer, this.model.state), this.model.state.game.answers);

      if (isCorrect !== null) {
        this.answer(new UserAnswer(isCorrect, this.model.state.time));
      }
    };
  }

  updateHeader() {
    const header = new ScreenHeader(this.model.state).element;
    this.root.element.replaceChild(header, this.header);
    this.header = header;
  }

  answer(answer) {

    if (answer !== null) {
      this.stopGame();
      this.model.addUserAnswer(answer);
      if (canContinue(this.model.state, answer.isCorrect)) {
        if (!answer.isCorrect) {
          this.model.reapLife();
        }
        this.startGame();
      } else {
        show(screenStats(this.model.state).element);
      }
    }
  }
}


class UserAnswer {
  constructor(isCorrect, time) {
    this.time = time;
    this.isCorrect = isCorrect;
  }
  get type() {
    switch (true) {
      case (!this.isCorrect):
        return AnswerType.WRONG;
      case (this.time > TimeLine.FAST):
        return AnswerType.FAST;
      case (this.time < TimeLine.SLOW):
        return AnswerType.SLOW;
      default:
        return AnswerType.CORRECT;
    }
  }
}


export default ScreenGame;
