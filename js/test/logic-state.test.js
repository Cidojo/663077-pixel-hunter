import {assert} from 'chai';
import {changeLevel, reapLife} from './../data/game-mechanics.js';
import {tick} from './../timer.js';


describe(`Testing updateTime() - function to change timer in game state object`, () => {
  // incorrect data

  it(`should deal with incorrect data inside state object`, () => {
    assert.throws(() => tick({time: -1}), /incorrect data, state object's time property should be in interval from 0 to 30/);
    assert.throws(() => tick({time: 31}), /incorrect data, state object's time property should be in interval from 0 to 30/);
  });

  // corner cases

  it(`should return object with updated time property`, () => {
    assert.equal(tick({time: 30}).time, 29);
    assert.equal(tick({time: 1}).time, 0);
  });

  it(`should not increase level if state object time is 0`, () => {
    assert.equal(tick({time: 0}).time, 0);
  });

  // invalid data

  it(`it should only take object with level property as a parameter`, () => {
    assert.throws(() => tick({}), /is not an object or has no time property/);
    assert.throws(() => tick([]), /is not an object or has no time property/);
    assert.throws(() => tick(0), /is not an object or has no time property/);
    assert.throws(() => tick({notValidProperty: 2}), /is not an object or has no time property/);
  });
});

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
