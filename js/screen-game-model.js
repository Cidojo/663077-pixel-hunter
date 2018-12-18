import {INITIAL_GAME, changeLevel, reapLife} from './data/game-mechanics.js';


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

  hasNextLevel() {
    try {
      changeLevel(this._state.level + 1);
    } catch (error) {
      return false;
    }

    return true;
  }

  addUserAnswer(answer) {
    this._state.answers.push(answer);
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

  // _tick() {
  //   this._state = tick(this._state);
  // }
}
