import AbstractView from './../abstract-view/abstract-view.js';


const NEXT_BUTTON_CLASS = `.intro__asterisk`;


export default class ScreenIntroView extends AbstractView {
  constructor() {
    super();
    this._splash = this.element.querySelector(NEXT_BUTTON_CLASS);
  }

  get template() {
    return `
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
    `;
  }

  start(startDegree = 270) {
    let degree = startDegree === 360 ? 270 : startDegree + 10;
    this._splash.style = `color: hsl(${degree}, 80%, 10%);`;
    this.timeout = setTimeout(() => this.start(degree), 150);
  }

  stop() {
    clearTimeout(this.timeout);
  }

  bind(screen) {
    screen.querySelector(NEXT_BUTTON_CLASS).addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      this.onNext();
    });
  }

  onNext() {
  }
}
