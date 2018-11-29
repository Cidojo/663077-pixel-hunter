import createMarkupNode from './create-markup-node.js';
// import screenFirstGame from './screen-game-1.js';
// import renderScreen from './render-screen.js';
import {switchScreen, INITIAL_STATE} from './screen-game-1.js';

const screenRulesMarkup = `
  <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>
`;

// creating rules node

const screenRules = createMarkupNode(screenRulesMarkup);

// listeners

const nameInputField = screenRules.querySelector(`.rules__input`);
const userDataForm = screenRules.querySelector(`.rules__form`);
const gameStartButton = screenRules.querySelector(`.rules__button`);

userDataForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  switchScreen(INITIAL_STATE);
});

nameInputField.addEventListener(`input`, () => {
  gameStartButton.disabled = nameInputField.value ? false : true;
});

export default screenRules;
