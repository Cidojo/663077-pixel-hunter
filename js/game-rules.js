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
  [AnswerType.FAST]: 10,
  [AnswerType.SLOW]: 20
};

const ScoreBonus = {
  CORRECT: 100,
  LIVES: 50,
  [AnswerType.FAST]: 50,
  [AnswerType.SLOW]: -50,
  [AnswerType.WRONG]: 0
};

const IMG_FRAME = {
  width: 468,
  height: 458
};

export {GameSetting, ScoreBonus, AnswerType, TimeLine, IMG_FRAME};
