import {GameSetting} from './game-rules.js';

// @param {state} object that describes current game state
// $return new game state object with decreased life property

const reapLife = (state) => {
  if (state !== Object(state) || !state.hasOwnProperty(`lifeAmount`)) {
    throw new Error(`${state} is not an object or has no liveAmount property`);
  }

  if (state.lifeAmount < 0) {
    throw new Error(`incorrect data, state object's lifeAmount property should not be less than 0`);
  }

  const newAmount = state.lifeAmount === 0 ? 0 : state.lifeAmount - 1;

  return Object.assign({}, state, {lifeAmount: newAmount});
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

export {reapLife, updateTime};
