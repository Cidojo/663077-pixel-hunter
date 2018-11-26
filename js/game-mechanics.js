const INIT_LIVES = 3;

const GameRules = {
  LEVEL_QUANTITY: 10,
  CORRECT_BONUS: 100,
  QUICK_BONUS: 50,
  SLOW_BONUS: -50,
  LIVES_BONUS: 50
};

const getScores = (arrayOfAnswerObjects, lives) => {
  let scores = 0;

  if (arrayOfAnswerObjects.length !== GameRules.LEVEL_QUANTITY) {
    return -1;
  }

  arrayOfAnswerObjects.forEach((it) => {
    let bonus = 0;

    if (it.isCorrect) {
      bonus += GameRules.CORRECT_BONUS;
    } else if (it.isQuick) {
      bonus += GameRules.QUICK_BONUS;
    } else if (it.isSlow) {
      bonus += GameRules.SLOW_BONUS;
    }

    scores += bonus;
  });

  if (lives) {
    scores += lives * GameRules.LIVES_BONUS;
  }

  return scores;
};

export {getScores, GameRules, INIT_LIVES};
