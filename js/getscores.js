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


export default getScores;