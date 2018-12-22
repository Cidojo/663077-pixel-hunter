const GameKind = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};


const ImgType = {
  PHOTO: `photo`,
  PAINT: `paint`,
  PAINTING: `paint`
};


const AnswerType = {
  FAST: `FAST`,
  SLOW: `SLOW`,
  WRONG: `WRONG`,
  CORRECT: `CORRECT`,
  UNKNOWN: `UNKNOWN`,
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
  [AnswerType.WRONG]: 0,
  [AnswerType.UNKNOWN]: 0
};

export {GameKind, ImgType, TimeLine, ScoreBonus, AnswerType};
