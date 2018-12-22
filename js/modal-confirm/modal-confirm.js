import ModalConfirmView from './modal-confirm-view.js';
import Application from './../application.js';


export default class ModalConfirm {
  constructor(currentGame) {
    this.root = new ModalConfirmView();
    this.root.onCancel = () => Application.continueGame(this.currentGame);
    this.root.onConfirm = () => Application.showGreeting();
    this.currentGame = currentGame;
  }

  get element() {
    return this.root.element;
  }
}
