import ModalConfirmView from './modal-confirm-view.js';
import Application from './../application.js';


const ESC_BUTTON_CODE = 27;


export default class ModalConfirm {
  constructor(currentGame) {
    this.root = new ModalConfirmView();
    this.root.onCancel = () => Application.continueGame(this.currentGame);
    this.root.onConfirm = () => {
      document.removeEventListener(`keydown`, onEscButtonPress);
      Application.showGreeting();
    };
    this.currentGame = currentGame;

    const onEscButtonPress = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      if (evt.keyCode === ESC_BUTTON_CODE) {
        this.root.onCancel();
        document.removeEventListener(`keydown`, onEscButtonPress);
      }
    };

    document.addEventListener(`keydown`, onEscButtonPress);
  }

  get element() {
    return this.root.element;
  }
}
