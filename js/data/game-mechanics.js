import {game, GAME_KIND} from './game-data.js';
import {GameSetting} from './../game-rules.js';


const INITIAL_GAME = Object.freeze({
  level: 0,
  type: 0,
  lives: GameSetting.INITIAL_LIVES,
  answers: [],
  time: 15,
  game: game.random
});


const checkAnswer = (answers, evt, state) => {
  const userAnswers = state.game.kind === GAME_KIND.FIND ?
    [answers.indexOf(evt.currentTarget)]
    :
    answers.filter((element) => element.checked).map((input) => input.value);

  return userAnswers.length === state.game.answers.length ?
    state.game.answers.every((gameAnswer, index) => userAnswers[index] === gameAnswer)
    :
    null;
};


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

  return Object.assign({}, state, {level: newLevel, game: game.random});
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


export {INITIAL_GAME, changeLevel, reapLife, updateTime, checkAnswer};
