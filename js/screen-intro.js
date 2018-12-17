import show from './render-screen.js';
import screenGreeting from './screen-greeting.js';
import ScreenIntroView from './screen-intro-view.js';

export default () => {

  const node = new ScreenIntroView();

  node.onNext = () => show(screenGreeting().element);

  return node;
};
