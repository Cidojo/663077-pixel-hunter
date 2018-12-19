import Application from './application.js';
import ScreenHeader from './screen-header.js';
import ScreenRulesView from './screen-rules-view.js';

export default class ScreenRules {
  constructor() {
    this.root = new ScreenRulesView();
    this.header = new ScreenHeader();
    this.root.addHeader(this.header.element);
    this.root.onNext = () => Application.showGame(`cid`);
  }

  get element() {
    return this.root.element;
  }
}
