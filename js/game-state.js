const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 0
});

const changeGame = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};

const reapLife = (game) => {
  return --game.lives;
};

const updateTime = (game) => {
  let current = 0;

  const intervalId = setInterval(() => {
    if (current <= 30) {
      game.time = ++current;
    } else {
      window.clearInterval(intervalId);
      game.time = -1;
    }

    return game.time;
  }, 1000);
};

const timer = {
  current: 0,
  id: null,

  reset() {
    this.current = 0;
  },

  start() {
    this.current = 0;

    this.id = setInterval(() => {
      if (this.current < 30) {
        this.current++;
      } else {
        this.stop();
      }
    }, 1000);
  },

  stop() {
    if (this.id) {
      window.clearInterval(this.id);
    }
    this.id = null;
  }
};

// class Answer {
//   constructor(isCorrect = false, isQuick = false, isSlow = false) {
//     this.isCorrect = isCorrect;
//     this.isQuick = isQuick;
//     this.isSlow = isSlow;
//   }
// }
