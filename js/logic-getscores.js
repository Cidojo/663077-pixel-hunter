import {GameSetting, ScoreBonus, AnswerType} from './game-rules.js';

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

  if (livesAmount > GameSetting.INITIAL_LIVES || livesAmount < 0) {
    throw new Error(`the lives must not exceed an interval from 0 to ${GameSetting.INITIAL_LIVES}`);
  }

  if (answers.length !== GameSetting.MAX_LEVEL) {
    return -1;
  }

  return answers.reduce((accumulator, current) => {
    return current.isCorrect ? accumulator + ScoreBonus.CORRECT + ScoreBonus[AnswerType[current.type]] : accumulator;
  }, livesAmount * ScoreBonus.EXTRA_LIFE);
};


export default getScores;
