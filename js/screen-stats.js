import ScreenStatsView from './screen-stats-view.js';
import MockStats from './mock.js';

export default class ScreenStats {
  constructor(state, history = MockStats) {
    this.root = new ScreenStatsView(state, history);
    this.root.addResults();
  }

  get element() {
    return this.root.element;
  }
}
