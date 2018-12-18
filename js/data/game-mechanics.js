import {game, GameKind} from './game-data.js';
import {GameSetting, AnswerType, TimeLine} from './../game-rules.js';

const INITIAL_GAME = Object.freeze({
  level: 0,
  type: 0,
  lives: GameSetting.INITIAL_LIVES,
  answers: [],
  time: 21,
  game: game.random
});

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


// @param {currentState} state objects
// $result boolean, checks if there are lives left in case of wrong answer

const canContinue = (currentState, answerStatus) => {
  return currentState.level + 1 <= GameSetting.MAX_LEVEL && (answerStatus || currentState.lives - 1 >= 0);
};


// @param {state} current state object
// @param {answerStatus} boolean, says is current user answer is full and correct or wrong
// $result new state object with added user answer

const updateStateAnswer = (state, answerStatus) => {
  state.answers.push(new UserAnswer(answerStatus, state.time));
  return Object.assign({}, state);
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


// @param {state} object that describes current game state
// $return new game state object with increased level property

const changeLevel = (state) => {
  if (state !== Object(state) || !state.hasOwnProperty(`level`)) {
    throw new Error(`${state} is not an object or has no level property`);
  }
  if (state.level < 0 || state.level > GameSetting.MAX_LEVEL) {
    throw new Error(`incorrect data, state object's level property should be in interval from 1 to ${GameSetting.MAX_LEVEL}`);
  }

  return Object.assign({}, state, {level: state.level + 1, game: game.random});
};


// @param {state} object that describes current game state
// $return new game state object with decreased life property

const reapLife = (state) => {
  if (state !== Object(state) || !state.hasOwnProperty(`lives`)) {
    throw new Error(`${state} is not an object or has no lives property`);
  }

  if (state.lives < 0) {
    throw new Error(`incorrect data, state object's lives property should not be less than 0`);
  }

  const newAmount = state.lives === 0 ? 0 : state.lives - 1;

  return Object.assign({}, state, {lives: newAmount});
};


// @param {state} object that describes current game state
// $return new game state object with decreased time property

const updateTime = (state) => {
  if (state !== Object(state) || !state.hasOwnProperty(`time`)) {
    throw new Error(`${state} is not an object or has no time property`);
  }

  if (state.time < 0 || state.time > GameSetting.TIME_LIMIT) {
    throw new Error(`incorrect data, state object's time property should be in interval from 0 to ${GameSetting.TIME_LIMIT}`);
  }

  const newTime = state.time === 0 ? 0 : state.time - 1;

  return Object.assign({}, state, {time: newTime});
};


const updateState = (state, answerStatus) => {
  const newState = updateStateAnswer(state, answerStatus);

  return changeLevel(answerStatus ? newState : reapLife(newState));
};


export {INITIAL_GAME, updateTime, updateState, getUserAnswers, canContinue, changeLevel, reapLife};
