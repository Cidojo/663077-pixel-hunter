import ScreenHeader from './screen-header.js';
import Application from './application.js';
import ScreenRulesView from './screen-rules-view.js';

export default class ScreenRules {
  constructor() {
    this.root = new ScreenRulesView();
    this.header = new ScreenHeader();
    this.root.element.insertAdjacentElement(`afterbegin`, this.header.element);
    this.root.onNext = () => Application.showGame(`cid`);
  }

  get element() {
    return this.root.element;
  }
}
