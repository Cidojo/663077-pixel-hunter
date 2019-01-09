import {createUserAnswer, getUserAnswers, checkUserAnswer} from './../data/game-mechanics.js';
import show from './../utils/show.js';
import ScreenGameView from './screen-game-view.js';
import {stopTimer} from './../utils/tick.js';
import Application from './../application.js';


const TICK_INTERVAL = 1000;


class ScreenGame {
  constructor(model) {
    this.model = model;
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
      this._timer = setTimeout(() => this._tick(), TICK_INTERVAL);
    }
  }

  init() {
    this.root = new ScreenGameView(this.model.state, this.model.playerName);

    this.root.onHomeButtonClick = () => {
      this.stopGame();
      Application.showConfirm(this);
    };

    this.root.onAnswer = (userAnswer) => {
      const isCorrect = checkUserAnswer(getUserAnswers(this.root.answers, userAnswer, this.model.state), this.model.state.game.answers);

      if (isCorrect !== null) {
        this.goToNextScreen(createUserAnswer(isCorrect, this.model.state.time));
      }
    };
  }

  startGame() {
    this.model.nextLevel();

    this.init();
    show(this.root.element);

    setTimeout(() => this._tick(), TICK_INTERVAL);
  }

  continueGame() {
    this.init();
    show(this.root.element);
    this._tick();
  }

  goToNextScreen(answer) {

    if (answer !== null) {
      this.stopGame();
      this.model.addUserAnswer(answer);

      const canContinueState = this.model.canContinue();

      if (!answer.isCorrect) {
        this.model.reapLife();
      }

      if (canContinueState) {
        this.startGame();
      } else {
        Application.showStats(this.model.state, this.playerName);
      }
    }
  }

  onTimeout() {
    this.goToNextScreen(createUserAnswer(false, 0));
  }
}


export default ScreenGame;
