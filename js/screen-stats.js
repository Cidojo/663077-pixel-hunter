import ScreenHeader from './screen-header.js';
import ScreenStatsView from './screen-stats-view.js';
import {GameSetting} from './game-rules.js';

const MockGame1 = {
  lives: 0,
  answers: new Array(GameSetting.MAX_LEVEL)
      .fill({
        isCorrect: true,
        type: `CORRECT`
      })
};

const MockGame2 = {
  lives: 3,
  answers: new Array(GameSetting.MAX_LEVEL)
      .fill({
        isCorrect: true,
        type: `SLOW`
      }, 0, 8)
      .fill({
        isCorrect: true,
        type: `FAST`
      }, 8)
};

const MockGame3 = {
  lives: 0,
  answers: new Array(GameSetting.MAX_LEVEL)
      .fill({
        isCorrect: true,
        type: `CORRECT`
      }, 0, 6)
      .fill({
        isCorrect: false,
        type: `WRONG`
      }, 6)
};

const MockStats = [
  MockGame1,
  MockGame2,
  MockGame3
];

export default (state, history = MockStats) => {
  const node = new ScreenStatsView(state, history);
  node.element.insertAdjacentElement(`afterbegin`, new ScreenHeader().element);

  return node;
};
