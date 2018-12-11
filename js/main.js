import renderScreen from './render-screen.js';
import startScreen from './screen-intro.js';
import {INITIAL_GAME} from './data/game-mechanics.js';

renderScreen(startScreen(INITIAL_GAME));
