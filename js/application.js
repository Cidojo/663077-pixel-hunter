import show from './show.js';
import ScreenIntro from './screen-intro.js';
import ScreenGreeting from './screen-greeting.js';
import ScreenRules from './screen-rules.js';
import ScreenGame from './screen-game.js';
import GameModel from './screen-game-model.js';
import ScreenStats from './screen-stats.js';
import ModalError from './modal-error.js';
import Loader from './loader.js';
// import ModalConfirm from './modal-confirm.js';


export default class Application {

  static start() {
    const intro = new ScreenIntro();
    show(intro.element);
    intro.start();
    Loader.loadData().
    then((data) => {
      this.data = data;
    }).
    catch(Application.showError).
    then(() => Application.showGreeting()).
    then(() => intro.stop());
  }

  static showGreeting() {
    const greeting = new ScreenGreeting();
    show(greeting.element);
  }

  static showRules() {
    const rules = new ScreenRules();
    show(rules.element);
  }

  static startGame() {
    const model = new GameModel(this.data);
    const screenGame = new ScreenGame(model);

    screenGame.startGame();
  }

  static showStats(state) {
    const statistics = new ScreenStats(state);
    show(statistics.element);
    Loader.saveResults(state).
      then(() => Loader.loadResults()).
      then((data) => statistics.showScores(data)).
      catch(Application.showError);
  }

  static showError(error) {
    const modalError = new ModalError(error);
    show(modalError.element);
  }
}
