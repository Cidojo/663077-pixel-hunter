// import header from './screen-header.js';
import {canContinue} from './data/game-mechanics.js';
import {TimeLine, AnswerType} from './game-rules.js';
import {show} from './utils.js';
import screenStats from './screen-stats.js';
import ScreenGameView from './screen-game-view.js';
import GameModel from './screen-game-model.js';

// const tick = (state) => {
//   return Object.assign({}, state, {time: state.time + 1});
// };
//
// const startTimer = (state) => {
//   return setTimeout(() => tick(state), 1000);
// };
//
// const stopTimer = (timer) => {
//   clearTimeout(timer);
// };


// const answerHandler = (userAnswer) {
//   switch
// }

// const getUserAnswer = (evt, node) => {
//   checkAnswer(node.answers, evt, state);
//
// };

const checkUserAnswer = (userAnswers, correctAnswers) => {
  return userAnswers.length === correctAnswers.length ?
    correctAnswers.every((gameAnswer, index) => userAnswers[index] === gameAnswer)
    :
    null;
};


// const screenGameSSSS = (state) => {
//
//   const node = new ScreenGameView(state);
//
//   node.element.insertAdjacentElement(`afterbegin`, header(state).element);
//
//   node.onAnswer = (userAnswer) => {
//     const isCorrect = getUserAnswers(node.answers, userAnswer, state);
//
//     if (isCorrect !== null) {
//       const newState = updateState(state, isCorrect);
//       const next = canContinue(state, isCorrect) ?
//         screenGame(newState)
//         :
//         screenStats(newState);
//
//       show(next.element);
//     }
//   };
//
//   return node;
// };

class ScreenGame {
  constructor(model) {
    this.model = model;

    this.root = new ScreenGameView(this.model.state);
    this._timer = null;
  }

  get element() {
    return this.root;
  }

  // stopGame() {
  //   stopTimer(this._timer);
  // }

  // _tick() {
  //   this.model.tick();

  //   this.updateHeader();
  // }

  startGame() {
    this.changeLevel();

    // this._tick();
  }

  changeLevel() {
    // startTimer(this.model.state);
    // debugger
    this.model.nextLevel();
    const level = new ScreenGameView(this.model.state);
    level.onAnswer = (userAnswer) => this.answer(checkUserAnswer(userAnswer, this.model.state.answers));
  }

  answer(answer) {
    if (answer !== null) {
      this.model.addAnswer(new UserAnswer(answer, this.model.state.time));
      const next = canContinue(this.model.state, answer) ?
        new ScreenGame(this.model.state)
        :
        screenStats(this.model.state);

      show(next.element);
    }
    this.stopGame();
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
      case (this.time < TimeLine.FAST):
        return AnswerType.FAST;
      case (this.time > TimeLine.SLOW):
        return AnswerType.SLOW;
      default:
        return AnswerType.CORRECT;
    }
  }
}

// const isCorrect = getUserAnswers(node.answers, userAnswer, state);
//
// if (isCorrect !== null) {
//   const newState = updateState(state, isCorrect);
//   const next = canContinue(state, isCorrect) ?
//     screenGame(newState)
//     :
//     screenStats(newState);
//
//   show(next.element);
// }


const gameModel = new GameModel(`cid`);
const screenGame = new ScreenGame(gameModel);

export default screenGame;
