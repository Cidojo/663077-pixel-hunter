import renderScreen from './render-screen.js';
import startScreen from './screen-intro.js';
import {INITIAL_QUIZ} from './data/quiz.js';

renderScreen(startScreen(INITIAL_QUIZ));
