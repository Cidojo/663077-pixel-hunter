import {show} from './utils.js';
import ScreenRules from './screen-rules.js';
import ScreenGreetingView from './screen-greeting-view.js';

export default class ScreenGreeting {
  constructor() {
    this.root = new ScreenGreetingView();
    this.next = new ScreenRules();
    this.root.onNext = () => show(this.next.element);
  }

  get element() {
    return this.root.element;
  }
}
