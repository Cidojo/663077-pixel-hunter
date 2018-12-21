import {GameKind} from './data/game-data.js';

const GameSetting = {
  MAX_LEVEL: 10,
  INITIAL_LIVES: 3,
  TIME_LIMIT: 30
};

const AnswerType = {
  FAST: `FAST`,
  SLOW: `SLOW`,
  WRONG: `WRONG`,
  CORRECT: `CORRECT`,
};

const TimeLine = {
  [AnswerType.FAST]: 20,
  [AnswerType.SLOW]: 10
};

const ScoreBonus = {
  CORRECT: 100,
  LIVES: 50,
  [AnswerType.FAST]: 50,
  [AnswerType.SLOW]: -50,
  [AnswerType.WRONG]: 0
};

const ImgFrame = {
  [GameKind.TINDER_LIKE]: {
    width: 705,
    height: 455
  },
  [GameKind.TWO_OF_TWO]: {
    width: 468,
    height: 458
  },
  [GameKind.ONE_OF_THREE]: {
    width: 304,
    height: 455
  }
};

export {GameSetting, ScoreBonus, AnswerType, TimeLine, ImgFrame};
