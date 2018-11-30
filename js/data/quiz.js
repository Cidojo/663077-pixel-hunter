import {quiz} from './quiz-data.js';
import {GameSetting} from './../game-rules.js';

const INITIAL_QUIZ = Object.freeze({
  level: 0,
  type: 1,
  //  magic?
  lives: GameSetting.INITIAL_LIVES,
  answers: [],
  creationTime: new Date(),
  game: null
});

// const checkAnswer = (answer, order) => {
//   return {
//     isCorrect: answer.value === currentGame.answers[order]
//   };
// };

// @param {state} object that describes current game state
// $return new game state object with increased level property

const changeLevel = (state) => {
  if (state !== Object(state) || !state.hasOwnProperty(`level`)) {
    throw new Error(`${state} is not an object or has no level property`);
  }
  if (state.level < 0 || state.level > GameSetting.MAX_LEVEL) {
    throw new Error(`incorrect data, state object's level property should be in interval from 0 to ${GameSetting.MAX_LEVEL}`);
  }

  const newLevel = state.level === GameSetting.MAX_LEVEL ? GameSetting.MAX_LEVEL : state.level + 1;

  return Object.assign({}, state, {level: newLevel, game: quiz.random});
};

export {INITIAL_QUIZ, changeLevel};
