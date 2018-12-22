import Loader from './loader.js';
import ScreenIntro from './screen-intro/screen-intro.js';
import ScreenGreeting from './screen-greeting/screen-greeting.js';
import ScreenRules from './screen-rules/screen-rules.js';
import ScreenGame from './screen-game/screen-game.js';
import GameModel from './screen-game/screen-game-model.js';
import ScreenStats from './screen-stats/screen-stats.js';
import ModalError from './modal-error/modal-error.js';
import ModalConfirm from './modal-confirm/modal-confirm.js';
import show from './utils/show.js';


export default class Application {

  static start() {
    const intro = new ScreenIntro();
    show(intro.element);

    Loader.loadData().
    then((data) => {
      this.data = data;
    }).
    catch(Application.showError).
    then(() => Application.showGreeting());
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
    const model = new GameModel(this.data, playerName);
    const screenGame = new ScreenGame(model);

    screenGame.startGame();
  }

  static continueGame(game) {
    const screenGame = game;

    screenGame.continueGame();
  }

  static showStats(state, playerName) {
    const statistics = new ScreenStats(state);
    show(statistics.element);
    Loader.saveResults(state).
      then(() => Loader.loadResults()).
      then((data) => statistics.showScores(data, playerName)).
      catch(Application.showError);
  }

  static showError(error) {
    const modalError = new ModalError(error);
    show(modalError.element);
  }

  static showConfirm(currentGame) {
    const modalConfirm = new ModalConfirm(currentGame);
    show(modalConfirm.element);
  }
}
