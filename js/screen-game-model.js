import {INITIAL_GAME, updateTime, updateState, checkAnswer, canContinue, changeLevel, reapLife} from './data/game-mechanics.js';


class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  hasNextLevel() {
    try {
      changeLevel(this._state.level + 1);
    } catch (error) {
      return false;
    }

    return true;
  }

  canContinue() {
    // return this.hasNextLevel() && this.
  }

  nextLevel() {
    this._state = changeLevel(this._state);
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
};
