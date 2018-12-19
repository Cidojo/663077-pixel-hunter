import ScreenHeaderView from './screen-header-view.js';
import Application from './application.js';

// @param {state} current state Object
// @result header node

export default class ScreenHeader {
  constructor(state) {
    this.root = new ScreenHeaderView(state);

    this.root.goHome = () => Application.showGreeting();
  }

  get element() {
    return this.root.element;
  }

  update(state) {
    this.root = new ScreenHeaderView(state);
  }
}
