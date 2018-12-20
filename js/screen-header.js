import ScreenHeaderView from './screen-header-view.js';
import Application from './application.js';


export default class ScreenHeader {
  constructor(state) {
    this.root = new ScreenHeaderView(state);

    this.root.goHome = () => Application.showGreeting();
    this.root.clickNotification = () => this.clickNotification();
  }

  get element() {
    return this.root.element;
  }

  update(state) {
    this.root = new ScreenHeaderView(state);
  }
}
