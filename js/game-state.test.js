import {assert} from 'chai';

const MAX_TIME_LIMIT = 10;
const gameo = {
  time: 2,
  level: 5,
  lives: 3,
  answers: new Array(3).fill({answer: `someAnswer`}),
};

const reapLife = (game) => {
  return --game.lives;
};

const updateTime = (game) => {
  let current = MAX_TIME_LIMIT;

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

describe(`Timer`, function () {
  updateTime(gameo);
  this.timeout(11000);
  before(function (done) {
    setTimeout(done, 10000);
  });

  it(`should`, (done) => {
    assert.equal(3, gameo.time);
    done();
  });
});
