import {GameSetting} from './game-rules.js';

const tick = (state) => {
  if (state !== Object(state) || !state.hasOwnProperty(`time`)) {
    throw new Error(`${state} is not an object or has no time property`);
  }

  if (state.time < 0 || state.time > GameSetting.TIME_LIMIT) {
    throw new Error(`incorrect data, state object's time property should be in interval from 0 to ${GameSetting.TIME_LIMIT}`);
  }

  const newTime = state.time === 0 ? 0 : state.time - 1;

  return Object.assign({}, state, {time: newTime});
};

const startTimer = (state) => {
  return setTimeout(() => tick(state), 1000);
};

const stopTimer = (timer) => {
  clearTimeout(timer);
};

const resetTimer = (state) => {
  return Object.assign({}, state, {time: GameSetting.TIME_LIMIT});
};

export {tick, startTimer, stopTimer, resetTimer};
