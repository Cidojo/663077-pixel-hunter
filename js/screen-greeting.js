import Application from './application.js';
import ScreenGreetingView from './screen-greeting-view.js';

export default class ScreenGreeting {
  constructor() {
    this.root = new ScreenGreetingView();
    this.root.onNext = () => Application.showRules();
  }

  get element() {
    return this.root.element;
  }
}
