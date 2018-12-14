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

class UserAnswer {
  constructor(isCorrect, time) {
    this.time = time;
    this.isCorrect = isCorrect;
  }
  get type() {
    switch (true) {
      case (!this.isCorrect):
        return AnswerType.WRONG;
      case (this.time < TimeLine.FAST):
        return AnswerType.FAST;
      case (this.time > TimeLine.SLOW):
        return AnswerType.SLOW;
      default:
        return AnswerType.CORRECT;
    }
  }
}

export {GameSetting, ScoreBonus, AnswerType, UserAnswer};
