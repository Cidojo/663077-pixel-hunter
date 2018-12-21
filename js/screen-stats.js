import ScreenStatsView from './screen-stats-view.js';

export default class ScreenStats {
  constructor(state) {
    this.root = new ScreenStatsView(state);
    // this.root.addResults();
  }

  get element() {
    return this.root.element;
  }

  showScores(data) {
    this.root.addResults(data);
  }
}
