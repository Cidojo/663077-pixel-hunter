import {createUserAnswer, getUserAnswers, checkUserAnswer} from './data/game-mechanics.js';
import show from './show.js';
import ScreenGameView from './screen-game-view.js';
import {stopTimer} from './timer.js';
import Application from './application.js';


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

      const canContinue = this.model.canContinue();

      if (!answer.isCorrect) {
        this.model.reapLife();
      }

      if (canContinue) {
        this.startGame();
      } else {
        Application.showStats(this.model.state);
      }
    }
  }

  onTimeout() {
    this.answer(createUserAnswer(false, 0));
  }
}


export default ScreenGame;
