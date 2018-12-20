const domContainer = {
  tagName: `main`,
  id: document.querySelector(`#main`).id,
  classList: [`central`]
};


const render = (html, containerOption) => {
  const container = document.createElement(containerOption.tagName);
  if (containerOption.id !== null) {
    container.id = containerOption.id;
  }

  if (containerOption.classList !== null) {
    container.classList.add(...containerOption.classList);
  }

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
