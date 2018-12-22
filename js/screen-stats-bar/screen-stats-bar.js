import ScreenStatsBarView from './screen-stats-bar-view.js';

export default class ScreenStatsBar {
  constructor(state) {
    this.root = new ScreenStatsBarView(state);
  }

  get element() {
    return this.root.element;
  }
}
