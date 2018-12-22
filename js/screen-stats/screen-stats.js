import ScreenStatsView from './screen-stats-view.js';

export default class ScreenStats {
  constructor(state) {
    this.root = new ScreenStatsView(state);
  }

  get element() {
    return this.root.element;
  }

  showScores(data, playerName) {
    this.root.addResults(data, playerName);
  }
}
