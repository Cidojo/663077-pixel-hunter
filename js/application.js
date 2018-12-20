import show from './show.js';
import ScreenIntro from './screen-intro.js';
import ScreenGreeting from './screen-greeting.js';
import ScreenRules from './screen-rules.js';
import ScreenGame from './screen-game.js';
import GameModel from './screen-game-model.js';
import ScreenStats from './screen-stats.js';

export default class Application {

  static showIntro() {
    const intro = new ScreenIntro();
    show(intro.element);
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
    const model = new GameModel();
    const screenGame = new ScreenGame(model);

    screenGame.startGame();
  }

  static showStats(state) {
    const statistics = new ScreenStats(state);
    show(statistics.element);
  }

}
