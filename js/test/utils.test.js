import assert from 'assert';
import resizeImg from './../utils/resize-img.js';
import {tick} from './../utils/tick.js';


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


const createTestForFrame = (frame) => {
  const assertRatio = (given, expected) => {
    const actual = resizeImg(frame, given);
    assert.deepEqual(actual, expected);
  };

  const createTest = (expected, multiplier) => {
    const given = {
      width: Math.floor(expected.width * multiplier),
      height: Math.floor(expected.height * multiplier)
    };
    it(`shrink ${multiplier}x: ${given.width}x${given.height} => ${expected.width}x${expected.height}`, () => {
      assertRatio(given, expected);
    });
  };

  const sequence = (expected) => {
    createTest(expected, 8);
    createTest(expected, 7);
    createTest(expected, 5);
    createTest(expected, 4);
    createTest(expected, 3);
    createTest(expected, 2);
    createTest(expected, 1);
  };

  describe(`Resize into frame: ${frame.width}x${frame.height}`, () => {

    describe(`when "width === height"`, () => {
      sequence({width: frame.width, height: frame.height});
    });

    describe(`when "width > height"`, () => {
      sequence({width: frame.width, height: Math.floor(frame.height / 2)});
    });

    describe(`when "width < height"`, () => {
      sequence({width: Math.floor(frame.width / 2), height: frame.height});
    });

  });
};

createTestForFrame({width: 256, height: 256});
createTestForFrame({width: 256, height: 128});

createTestForFrame({width: 468, height: 458});
createTestForFrame({width: 705, height: 455});
createTestForFrame({width: 304, height: 455});
createTestForFrame({width: 400, height: 100});
