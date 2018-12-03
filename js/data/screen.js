import screenIntro from './../screen-intro.js';
import screenGreeting from './../screen-greeting.js';

const INITIAL_SCREEN = {
  home: 0,
  nextScreen: 3
};


const SCREEN_ORDER = [`home`, `screenIntro`, `screenGreeting`, `screenGame`, `screenStats`];

const screens = {
  screenIntro: screenIntro1,
  screenGreeting: screenGreeting1,

  get home() {
    return this[screenIntro];
  }
};
