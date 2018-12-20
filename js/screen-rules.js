import Application from './application.js';
import ScreenRulesView from './screen-rules-view.js';

export default class ScreenRules {
  constructor() {
    this.root = new ScreenRulesView();
    this.root.onNext = () => Application.startGame();
  }

  get element() {
    return this.root.element;
  }
}
