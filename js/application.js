import {show} from './utils.js';
import ScreenIntro from './screen-intro.js';
import screenStats from './screen-stats.js';
import ScreenGame from './screen-game.js';
import GameModel from './screen-game-model.js';

export default class Application {

  static showWelcome() {
    const welcome = new ScreenIntro();
    show(welcome.element);
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
