import {GameSetting} from './game-rules.js';


const MockGame1 = {
  lives: 0,
  answers: new Array(GameSetting.MAX_LEVEL)
      .fill({
        isCorrect: true,
        type: `CORRECT`
      })
};

const MockGame2 = {
  lives: 3,
  answers: new Array(GameSetting.MAX_LEVEL)
      .fill({
        isCorrect: true,
        type: `SLOW`
      }, 0, 8)
      .fill({
        isCorrect: true,
        type: `FAST`
      }, 8)
};

const MockGame3 = {
  lives: 0,
  answers: new Array(GameSetting.MAX_LEVEL)
      .fill({
        isCorrect: true,
        type: `CORRECT`
      }, 0, 6)
      .fill({
        isCorrect: false,
        type: `WRONG`
      }, 6)
};

export default [
  MockGame1,
  MockGame2,
  MockGame3
];
