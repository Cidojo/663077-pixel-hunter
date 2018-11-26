import {assert} from 'chai';
import {INIT_LIVES} from './game-mechanics.js';

const GameSetting = {
  LEVELS: 10,
  INITIAL_LIVES: 3,
  TIME_LIMIT: 30
};

const AnswerType = {
  QUICK: `quick`,
  SLOW: `slow`,
  CORRECT: `correct`
};

const ScoreBonus = {
  CORRECT: 100,
  QUICK: 50,
  SLOW: -50,
  LIFE: 50
};

const getScores = (arrayOfAnswerObjects, lives) => {
  let score = 0;

  if (arrayOfAnswerObjects.length !== GameRules.LEVEL_QUANTITY) {
    return -1;
  }

  arrayOfAnswerObjects.forEach((it) => {
    let bonus = 0;
//reduce

    bonus += ScoreBonus[it.type];

    score += bonus;
  });

  if (lives) {
    score += lives * GameRules.LIVES_BONUS;
  }

  return scores;
};

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

  it(`should return 350 if all answers have been recieved slowly and no lives preserved`, () => {
    let testCase = new Array(GameRules.LEVEL_QUANTITY).fill({
      isCorrect: true,
      isQuick: false,
      isSlow: true
    });
    testCase[0].isCorrect
    assert.equal(350, getScores(testCase, 0));
  });


//  100 lives
});
