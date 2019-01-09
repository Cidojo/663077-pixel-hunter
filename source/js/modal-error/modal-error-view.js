import AbstractView from './../abstract-view/abstract-view.js';


export default class ModalError extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
      <section class="modal">
        <div class="modal__inner">
          <h2 class="modal__title">Произошла ошибка! ${this.error.message}</h2>
          <p class="modal__text modal__text--error">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
        </div>
      </section>
    `;
  }
}
