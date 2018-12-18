import {assert} from 'chai';
import getScores from './../logic-getscores.js';
import {GameSetting} from './../game-rules.js';

describe(`Testing getScores() - function calculates scores at the end of the game`, () => {

  // corner cases

  it(`should return 1150 if all answers have been recieved not slowly and not quickly and all lives preserved`, () => {
    const testCase = new Array(GameSetting.MAX_LEVEL).fill({
      isCorrect: true,
      type: `CORRECT`
    });

    assert.equal(getScores(testCase, GameSetting.INITIAL_LIVES), 1150);
  });

  it(`should return 1650 if all answers have been recieved quickly and all lives preserved`, () => {
    const testCase = new Array(GameSetting.MAX_LEVEL)
        .fill({
          isCorrect: true,
          type: `FAST`
        });

    assert.equal(getScores(testCase, GameSetting.INITIAL_LIVES), 1650);
  });

  it(`should return 350 if all answers have been recieved slowly and no lives preserved`, () => {
    const testCase = new Array(GameSetting.MAX_LEVEL)
        .fill({
          isCorrect: true,
          type: `SLOW`
        }, 0, 7)
        .fill({
          isCorrect: false,
          type: `WRONG`
        }, 7);

    assert.equal(getScores(testCase, 0), 350);
  });

  it(`should allow empty array as a parameter`, () => {
    assert.equal(-1, getScores([], 0));
  });

  // incorrect data

  it(`should return -1 if not all answers has been recieved (less than ${GameSetting.MAX_LEVEL})`, () => {
    assert.equal(-1, getScores([{}, {}], 0));
  });

  it(`the lives can't be higher than ${GameSetting.INITIAL_LIVES}`, () => {
    assert.throws(() => getScores([], 4), /the lives can't be higher than 3/);
  });

  // invalid data

  it(`should throw an error if answers not empty, but is not an array of objects`, () => {
    assert.throws(() => getScores({}, 0), /the answers parameter should be array of objects/);
    assert.throws(() => getScores(null, 0), /the answers parameter should be array of objects/);
    assert.throws(() => getScores(undefined, 0), /the answers parameter should be array of objects/);
    assert.throws(() => getScores([1, 2, 3], 0), /the answers parameter should be array of objects/);
  });

  it(`should throw an error if lives is not a number`, () => {
    assert.throws(() => getScores([], `0`), /the lives parameter should be a number/);
    assert.throws(() => getScores([], NaN), /the lives parameter should be a number/);
    assert.throws(() => getScores([], {}), /the lives parameter should be a number/);
    assert.throws(() => getScores([], []), /the lives parameter should be a number/);
    assert.throws(() => getScores([]), /the lives parameter should be a number/);
  });
});
