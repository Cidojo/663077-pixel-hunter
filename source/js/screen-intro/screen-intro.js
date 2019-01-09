import ScreenIntroView from './screen-intro-view.js';
import Application from './../application.js';

export default class ScreenIntro {
  constructor() {
    this.root = new ScreenIntroView();
    this.root.onNext = () => Application.showGreeting();
  }

  get element() {
    return this.root.element;
  }

  start() {
    this.root.start();
  }

  stop() {
    this.root.stop();
  }
}
