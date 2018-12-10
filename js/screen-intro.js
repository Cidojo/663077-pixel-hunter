import {createMarkupNode} from './utils.js';
import screenGreeting from './screen-greeting.js';
import renderScreen from './render-screen.js';

export default () => {
  const screenIntroMarkup = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;

  const screenIntro = createMarkupNode(screenIntroMarkup);

  screenIntro.querySelector(`.intro__asterisk`).addEventListener(`click`, () => renderScreen(screenGreeting()));

  return screenIntro;
};
