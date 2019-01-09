import Loader from './loader.js';
import ScreenIntro from './screen-intro/screen-intro.js';
import ScreenGreeting from './screen-greeting/screen-greeting.js';
import ScreenRules from './screen-rules/screen-rules.js';
import ScreenGame from './screen-game/screen-game.js';
import GameModel from './screen-game/screen-game-model.js';
import ScreenStats from './screen-stats/screen-stats.js';
import ModalErrorView from './modal-error/modal-error-view.js';
import ModalConfirm from './modal-confirm/modal-confirm.js';
import show from './utils/show.js';


export default class Application {

  static start() {
    this.load();
  }

  static async load() {
    const intro = new ScreenIntro();
    show(intro.element);
    try {
      this.gameData = await Loader.loadData();
      this.showGreeting();
    } catch (error) {
      this.showError(error);
    }
  }

  static showGreeting() {
    const greeting = new ScreenGreeting();
    show(greeting.element);
  }

  static showRules() {
    const rules = new ScreenRules();
    show(rules.element);
  }

  static startGame(playerName) {
    const model = new GameModel(this.gameData, playerName);
    const screenGame = new ScreenGame(model);

    screenGame.startGame();
  }

  static continueGame(game) {
    const screenGame = game;

    screenGame.continueGame();
  }

  static async showStats(state, playerName) {
    const statistics = new ScreenStats(state, playerName);
    show(statistics.element);
    try {
      await Loader.saveResults(state);
      await Loader.loadResults();
      statistics.showScores(await Loader.loadResults());
    } catch (error) {
      this.showError(error);
    }
  }

  static showError(error) {
    const modalError = new ModalErrorView(error);
    show(modalError.element);
  }

  static showConfirm(currentGame) {
    const modalConfirm = new ModalConfirm(currentGame);
    show(modalConfirm.element);
  }
}
