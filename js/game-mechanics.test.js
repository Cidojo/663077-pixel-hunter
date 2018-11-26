import {assert} from 'chai';
import {getScores, GameRules, INIT_LIVES} from './game-mechanics.js';

describe(`getScores`, () => {
  it(`should return -1 if answers less than 10`, () => {
    assert.equal(-1, getScores({}));
  });

  it(`should return 1150 if all answers have been recieved not slowly and not fast and all lives preserved`, () => {
    let testCase = new Array(GameRules.LEVEL_QUANTITY).fill({
      isCorrect: true,
      isQuick: false,
      isSlow: false
    });

    assert.equal(1150, getScores(testCase, INIT_LIVES));
  });
});
