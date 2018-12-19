import {INITIAL_GAME, changeLevel, reapLife} from './data/game-mechanics.js';
import {tick, resetTimer} from './timer.js';

export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  get currentLevel() {
    return this._state.level;
  }

  get lastUserAnswer() {
    return this._state.answers[this._state.answers.length - 1];
  }

  hasNextLevel() {
    try {
      changeLevel(this._state);
    } catch (error) {
      return false;
    }

    return true;
  }

  addUserAnswer(answer) {
    this._state.answers.push(answer);
  }

  canContinue() {
    // debugger
    return this.hasNextLevel() && (this.lastUserAnswer.isCorrect || this._state.lives !== 0);
  }

  nextLevel() {
    // this._state = resetTimer(this._state);
    this._state = changeLevel(resetTimer(this._state));
  }

  reapLife() {
    this._state = reapLife(this._state);
  }

  restart() {
    this._state = INITIAL_GAME;
  }

  isDead() {
    return this._state.lives - 1 <= 0;
  }

  tick() {
    this._state = tick(this._state);
  }
}
