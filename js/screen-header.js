import show from './render-screen.js';
import screenGreeting from './screen-greeting.js';
import ScreenHeaderView from './screen-header-view.js';

// @param {state} current state Object
// @result header node

export default (state) => {
  const node = new ScreenHeaderView(state);

  node.showHomeScreen = () => show(screenGreeting().element);

  return node;
};
