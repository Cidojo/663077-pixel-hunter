import {GameSetting} from './game-setting.js';
import {GameKind, AnswerType, TimeLine, ScoreBonus} from './game-data.js';


const INITIAL_GAME = Object.freeze({
  level: 0,
  type: 0,
  lives: GameSetting.INITIAL_LIVES,
  answers: [],
  time: GameSetting.TIME_LIMIT,
  game: null
});


// @param {answers} array on answer objects
// @param {livesAmount} amount of lives at the end of the game
// $return scores if win or -1 if lost

const getScores = (answers, livesAmount) => {
  if (!Array.isArray(answers) || answers.some((it) => it !== Object(it))) {
    throw new Error(`the answers parameter should be array of objects`);
  }

  if (typeof livesAmount !== `number` || isNaN(livesAmount)) {
    throw new Error(`the lives parameter should be a number`);
  }

  if (livesAmount > GameSetting.INITIAL_LIVES) {
    throw new Error(`the lives can't be higher than ${GameSetting.INITIAL_LIVES}`);
  }

  if (answers.length !== GameSetting.MAX_LEVEL || livesAmount < 0) {
    return -1;
  }

  return answers.reduce((accumulator, current) => {
    return accumulator + ScoreBonus[current.type] + (current.isCorrect && current.type !== AnswerType.CORRECT ? ScoreBonus.CORRECT : 0);
  }, livesAmount * ScoreBonus.LIVES);
};


const createUserAnswer = (answerStatus, time) => {
  const getAnswerType = () => {
    switch (true) {
      case (!answerStatus):
        return AnswerType.WRONG;
      case (time > TimeLine.FAST):
        return AnswerType.FAST;
      case (time < TimeLine.SLOW):
        return AnswerType.SLOW;
      default:
        return AnswerType.CORRECT;
    }
  };

  return {
    isCorrect: answerStatus,
    time,
    type: getAnswerType()
  };
};

const checkUserAnswer = (userAnswers, correctAnswers) => {
  return userAnswers.length === correctAnswers.length ?
    correctAnswers.every((gameAnswer, index) => userAnswers[index] === gameAnswer)
    :
    null;
};


const getUserAnswers = (possibleAnswers, userAnswer, state) => {

  return state.game.kind === GameKind.ONE_OF_THREE ?
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
  if (state.level < 0 || state.level >= GameSetting.MAX_LEVEL) {
    throw new Error(`incorrect data, state object's level property should be in interval from 0 to ${GameSetting.MAX_LEVEL - 1}`);
  }

  return Object.assign({}, state, {level: state.level + 1});
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


export {INITIAL_GAME, changeLevel, reapLife, createUserAnswer, checkUserAnswer, getUserAnswers, getScores};
