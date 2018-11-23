import {assert} from 'chai';
import {getScores, Answer, GameRules, currentGame, Game} from './../js/game-mechanics.js';


describe(`getScores`, () => {

  it(`should return 1150 if all answers given not fast, not slow and no lives were spent`, () => {
    let testCase = new Array(GameRules.LEVELS).fill(new Answer(15, true));

    assert.equal(1150, getScores(testCase));
  });

  it(`should return -1 if too many mistakes or no life left`, () => {
    let testCase = new Array(GameRules.LEVELS).fill(new Answer());

    assert.equal(-1, getScores(testCase));
  });

  it(`should return -1 if answers < 10`, () => {
    let testCase = new Array(9).fill(new Answer(15, true));

    assert.equal(-1, getScores(testCase));
  });

  it(`should return 1000 if all answered not fast, not slow and no lives left at the end`, () => {
    let testCase = new Array(GameRules.LEVELS).fill(new Answer(15, true));

    assert.equal(1000, getScores(testCase, 0));
  });

  it(`should return 1650 if all answered fast and all lives left at the end`, () => {
    let testCase = new Array(GameRules.LEVELS).fill(new Answer(9, true));

    assert.equal(1650, getScores(testCase));
  });

});

describe(`currentGame`, () => {
  let testGame = new Game();

  it(`should decreaseLives`, () => {
    assert(2, testGame.decreaseLives());
  });

});
