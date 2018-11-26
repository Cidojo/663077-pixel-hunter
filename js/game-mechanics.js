const GameRules = {
  LEVEL_QUANTITY: 10,
  CORRECT_BONUS: 100,
  QUICK_BONUS: 50,
  SLOW_BONUS: -50,
  LIVES_BONUS: 50,
  MAX_TIME_LIMIT: 10,
  INIT_LIVES: 3
};


const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 0
});

let newGame = Object.assign({}, INITIAL_GAME);

const reapLife = (game) => {
  return --game.lives;
};

const updateTime = (game) => {
  let current = GameRules.MAX_TIME_LIMIT;

  let timeoutId = setTimeout(function tick() {
    if (current > 0 && game.answers.length !== game.level) {
      game.time = current--;
      timeoutId = setTimeout(tick, 1000);
    } else {
      clearTimeout(timeoutId);
      game.time = current;
    }
  }, 1000);
};



export {getScores, GameRules};
