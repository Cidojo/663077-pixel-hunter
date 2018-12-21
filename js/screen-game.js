import {createUserAnswer, getUserAnswers, checkUserAnswer} from './data/game-mechanics.js';
import show from './show.js';
import ScreenGameView from './screen-game-view.js';
import {stopTimer} from './timer.js';
import Application from './application.js';
import resizeImg from './resize-img.js';


class ScreenGame {
  constructor(model) {
    this.model = model;
    this._timer = null;
    this.init();
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

  init() {
    this.root = new ScreenGameView(this.model.state);

    this.root.onHomeButtonClick = () => {
      this.stopGame();
      Application.showGreeting();
    };

    this.root.onAnswer = (userAnswer) => {
      const isCorrect = checkUserAnswer(getUserAnswers(this.root.answers, userAnswer, this.model.state), this.model.state.game.answers);

      if (isCorrect !== null) {
        this.answer(createUserAnswer(isCorrect, this.model.state.time));
      }
    };

    this.root.onImgLoad = (img, index, container) => {
      const frame = this.model.data[this.model.state.level - 1].options[index].image.size;
      const given = {
        width: img.naturalWidth,
        height: img.naturalHeight
      };

      const newImgSize = resizeImg(frame, given);
      container.style = `width: ${frame.width}px; height: ${frame.height}px`;
      img.width = newImgSize.width;
      img.height = newImgSize.height;
    };
  }

  startGame() {
    this.model.nextLevel();

    this.init();
    show(this.root.element);
    this._tick();
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
