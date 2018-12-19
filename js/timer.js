import {GameSetting} from './game-rules.js';

const tick = (state) => {
  return Object.assign({}, state, {time: state.time - 1});
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

// import {tick, startTimer, stopTimer} from './timer.js';
