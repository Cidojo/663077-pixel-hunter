import AbstractView from './../abstract-view/abstract-view.js';


const InteractiveElementSelector = {
  CLOSE_BUTTON: `.modal__close`,
  CONFIRM_BUTTON: `.modal__btn:first-of-type`,
  CANCEL_BUTTON: `.modal__btn:last-of-type`
};


export default class ModalConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn">Ок</button>
            <button class="modal__btn">Отмена</button>
          </div>
        </form>
      </section>
    `;
  }

  bind(screen) {
    screen.querySelector(InteractiveElementSelector.CLOSE_BUTTON).addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      this.onCancel();
    });

    screen.querySelector(InteractiveElementSelector.CONFIRM_BUTTON).addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      this.onConfirm();
    });

    screen.querySelector(InteractiveElementSelector.CANCEL_BUTTON).addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      this.onCancel();
    });
  }

  onCancel() {
  }
  onConfirm() {
  }
}
