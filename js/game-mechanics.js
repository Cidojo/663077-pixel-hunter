import renderScreen from './render-screen.js';
import screenFirstGame from './screen-game-1.js';
import screenSecondGame from './screen-game-2.js';
import screenThirdGame from './screen-game-3.js';

const SCREEN = {
  1: screenFirstGame,
  2: screenSecondGame,
  3: screenThirdGame
};


const GameRules = {
  LEVELS: 10,

  INIT_LIVES: 3,

  IS_CORRECT_BONUS: 100,

  LIFE_BONUS: 50,

  IS_FAST: {
    TIME: 10,
    BONUS: 50
  },

  IS_SLOW: {
    TIME: 20,
    BONUS: -50
  }
};


const getRandomGame = () => {
  return SCREEN[Math.ceil(Math.random() * 3)];
};

class Game {
  constructor() {
    this.gameNumber = 1;
    this.lives = GameRules.INIT_LIVES;
  }

  reapLife() {
    if (this.lives > 0) {
      this.lives--;
    }

    return `game stopped`;
  }

  switchNext() {
    if (this.gameNumber < GameRules.LEVELS) {
      renderScreen(getRandomGame());
    }
  }
}

let currentGame = new Game();

class Answer {
  constructor(time = 0, isCorrect = false) {
    this.time = time;
    this.isCorrect = isCorrect;
  }
}


const countCorrectAnswers = (userAnswers) => {
  return userAnswers.slice()
      .reduce((total, current) => {
        return current.isCorrect ? ++total : total;
      }, 0);
};


const getScores = (answers, lives = 3) => {
  let scores = 0;

  if (!answers.length ||
      answers.length < GameRules.LEVELS ||
      countCorrectAnswers(answers) < GameRules.LEVELS - GameRules.INIT_LIVES
  ) {
    return -1;
  }

  answers.forEach((it) => {
    if (it.isCorrect) {
      scores += GameRules.IS_CORRECT_BONUS;

      let bonus = 0;

      if (it.time < GameRules.IS_FAST.TIME) {
        bonus = GameRules.IS_FAST.BONUS;
      } else if (it.time >= GameRules.IS_SLOW.TIME) {
        bonus = GameRules.IS_SLOW.BONUS;
      }

      scores += bonus;
    }
  });

  if (lives) {
    scores += GameRules.LIFE_BONUS * lives;
  }

  return scores;
};


export {getScores, Answer, GameRules, currentGame, Game};
