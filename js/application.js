import {show} from './utils.js';
import ScreenIntro from './screen-intro.js';
import ScreenGreeting from './screen-greeting.js';
import ScreenRules from './screen-rules.js';
import ScreenGame from './screen-game.js';
import GameModel from './screen-game-model.js';
import screenStats from './screen-stats.js';

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

  static showGame(userName) {
    const model = new GameModel(userName);
    const screenGame = new ScreenGame(model);

    show(screenGame.element);
    screenGame.startGame();
  }

  static showStats(stats) {
    // const statistics = new StatsScreen(stats);
    // show(statistics.element);
    const statistics = screenStats(stats);
    show(statistics.element);
  }

}
