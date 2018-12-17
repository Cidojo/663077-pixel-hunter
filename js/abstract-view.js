const domContainer = {
  TAG: `main`,
  ID: document.querySelector(`#main`).id,
  CLASS_LIST: [`central`]
};


const render = (html, containerOption) => {
  const container = document.createElement(containerOption.TAG);
  if (containerOption.ID) {
    container.id = containerOption.ID;
  }
  container.classList.add([...containerOption.CLASS_LIST]);
  container.innerHTML = html.trim();

  return container;
};


export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render(containerOption = domContainer) {
    return render(this.template, containerOption);
  }

  bind() {
  }
}
