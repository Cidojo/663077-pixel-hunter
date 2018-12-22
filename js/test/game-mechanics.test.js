import {assert} from 'chai';
import {changeLevel, reapLife, getScores} from './../data/game-mechanics.js';
import {GameSetting} from './../data/game-setting.js';


describe(`Testing changeLevel() - function to change level in game state object`, () => {
  // incorrect data

  it(`should deal with incorrect data inside state object`, () => {
    assert.throws(() => changeLevel({level: -1}), /incorrect data, state object's level property should be in interval from 0 to 9/);
    assert.throws(() => changeLevel({level: 10}), /incorrect data, state object's level property should be in interval from 0 to 9/);
  });

  // corner cases

  it(`should return object with increased level`, () => {
    assert.equal(changeLevel({level: 1}).level, 2);
    assert.equal(changeLevel({level: 9}).level, 10);
  });

  // invalid data

  it(`it should only take object with level property as a parameter`, () => {
    assert.throws(() => changeLevel({}), /is not an object or has no level property/);
    assert.throws(() => changeLevel([]), /is not an object or has no level property/);
    assert.throws(() => changeLevel(0), /is not an object or has no level property/);
    assert.throws(() => changeLevel({notValidProperty: 2}), /is not an object or has no level property/);
  });
});


describe(`Testing reapLife() - function to manage lives count in game state object`, () => {

  // incorrect data

  it(`should deal with incorrect data inside state object`, () => {
    assert.throws(() => reapLife({lives: -1}), /incorrect data, state object's lives property should not be less than 0/);
  });

  // corner cases

  it(`should return object with decreased lives`, () => {
    assert.equal(reapLife({lives: 3}).lives, 2);
  });

  it(`should not decrease lives if state object lives is 0`, () => {
    assert.equal(reapLife({lives: 0}).lives, 0);
  });

  // invalid data

  it(`it should only take object with lives property as a parameter`, () => {
    assert.throws(() => reapLife({}), /is not an object or has no lives property/);
    assert.throws(() => reapLife([]), /is not an object or has no lives property/);
    assert.throws(() => reapLife(0), /is not an object or has no lives property/);
    assert.throws(() => reapLife({notValidProperty: 2}), /is not an object or has no lives property/);
  });
});


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
