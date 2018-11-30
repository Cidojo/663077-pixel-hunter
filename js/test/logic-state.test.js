import {assert} from 'chai';
import {changeLevel, reapLife, updateTime} from './../data/quiz.js';

describe(`Testing updateTime() - function to change timer in game state object`, () => {
  // incorrect data

  it(`should deal with incorrect data inside state object`, () => {
    assert.throws(() => updateTime({time: -1}), /incorrect data, state object's time property should be in interval from 0 to 30/);
    assert.throws(() => updateTime({time: 31}), /incorrect data, state object's time property should be in interval from 0 to 30/);
  });

  // corner cases

  it(`should return object with updated time property`, () => {
    assert.equal(updateTime({time: 30}).time, 29);
    assert.equal(updateTime({time: 1}).time, 0);
  });

  it(`should not increase level if state object time is 0`, () => {
    assert.equal(updateTime({time: 0}).time, 0);
  });

  // invalid data

  it(`it should only take object with level property as a parameter`, () => {
    assert.throws(() => updateTime({}), /is not an object or has no time property/);
    assert.throws(() => updateTime([]), /is not an object or has no time property/);
    assert.throws(() => updateTime(0), /is not an object or has no time property/);
    assert.throws(() => updateTime({notValidProperty: 2}), /is not an object or has no time property/);
  });
});

describe(`Testing changeLevel() - function to change level in game state object`, () => {
  // incorrect data

  it(`should deal with incorrect data inside state object`, () => {
    assert.throws(() => changeLevel({level: -1}), /incorrect data, state object's level property should be in interval from 1 to 10/);
    assert.throws(() => changeLevel({level: 11}), /incorrect data, state object's level property should be in interval from 1 to 10/);
  });

  // corner cases

  it(`should return object with increased level`, () => {
    assert.equal(changeLevel({level: 0}).level, 1);
    assert.equal(changeLevel({level: 1}).level, 2);
    assert.equal(changeLevel({level: 9}).level, 10);
  });

  it(`should not increase level if state object level is maximum (10)`, () => {
    assert.equal(changeLevel({level: 10}).level, 10);
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
    assert.throws(() => reapLife({lifeAmount: -1}), /incorrect data, state object's lifeAmount property should not be less than 0/);
  });

  // corner cases

  it(`should return object with decreased lives`, () => {
    assert.equal(reapLife({lifeAmount: 3}).lifeAmount, 2);
  });

  it(`should not decrease lives if state object lives is 0`, () => {
    assert.equal(reapLife({lifeAmount: 0}).lifeAmount, 0);
  });

  // invalid data

  it(`it should only take object with liveAmount property as a parameter`, () => {
    assert.throws(() => reapLife({}), /is not an object or has no liveAmount property/);
    assert.throws(() => reapLife([]), /is not an object or has no liveAmount property/);
    assert.throws(() => reapLife(0), /is not an object or has no liveAmount property/);
    assert.throws(() => reapLife({notValidProperty: 2}), /is not an object or has no liveAmount property/);
  });
});
