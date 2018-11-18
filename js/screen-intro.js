import createMarkupNode from './create-markup-node.js';
import screenGreeting from './screen-greeting.js';
import renderScreen from './render-screen.js';

const screenIntroMarkup = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;

// creating intro node

const screenIntro = createMarkupNode(screenIntroMarkup);

// listener

const asterisk = screenIntro.querySelector(`.intro__asterisk`);

asterisk.addEventListener(`click`, () => renderScreen(screenGreeting));

export default screenIntro;
