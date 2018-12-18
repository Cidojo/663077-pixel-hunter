import header from './screen-header.js';
import screenGame from './screen-game.js';
// import {show} from './utils.js';
// import {INITIAL_GAME} from './data/game-mechanics.js';
import ScreenRulesView from './screen-rules-view.js';

export default () => {
  const node = new ScreenRulesView();
  node.element.insertAdjacentElement(`afterbegin`, header().element);

  node.onNext = () => screenGame.startGame();

  return node;
};
