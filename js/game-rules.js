const GameSetting = {
  MAX_LEVEL: 10,
  INITIAL_LIVES: 3,
  TIME_LIMIT: 30
};

const AnswerType = {
  FAST: `FAST`,
  SLOW: `SLOW`,
  NORMAL: `NORMAL`,
  WRONG: `WRONG`,
  CORRECT: `CORRECT`,
};

const ScoreBonus = {
  CORRECT: 100,
  EXTRA_LIFE: 50,
  [AnswerType.FAST]: 50,
  [AnswerType.SLOW]: -50,
  [AnswerType.NORMAL]: 0
};


export {GameSetting, ScoreBonus, AnswerType};
