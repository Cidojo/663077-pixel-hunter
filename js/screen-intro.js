import {show} from './utils.js';
import ScreenGreeting from './screen-greeting.js';
import ScreenIntroView from './screen-intro-view.js';

export default class ScreenIntro {
  constructor() {
    this.root = new ScreenIntroView();
    this.next = new ScreenGreeting();

    this.root.onNext = () => show(this.next.element);
  }

  get element() {
    return this.root.element;
  }
}
