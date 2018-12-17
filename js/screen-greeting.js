import show from './render-screen.js';
import screenRules from './screen-rules.js';
import ScreenGreetingView from './screen-greeting-view.js';

export default () => {

  const node = new ScreenGreetingView();

  node.onNext = () => show(screenRules().element);

  return node;
};
