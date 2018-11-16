'use strict';

//  MODULE {render-screens.js}

const KeyCodes = {
  ESC: 27,
  AR_LEFT: 37,
  AR_RIGHT: 39,
  ENTER: 13
};

const main = document.querySelector(`#main`);

const bodyNode = document.querySelector(`body`);


const screens = Array.from(document.querySelectorAll(`template`)).map((it) => {
  const shadow = document.createElement(`div`);
  const content = it.content.cloneNode(true);
  shadow.appendChild(content);
  return shadow.cloneNode(true);
});

let currentScreenNumber = 0;

const screensNavMarkup = `
    <div class="arrows__wrap">
      <style>
        .arrows__wrap {
          position: absolute;
          top: 95px;
          left: 50%;
          margin-left: -56px;
        }
        .arrows__btn {
          background: none;
          border: 2px solid black;
          padding: 5px 20px;
        }
      </style>
      <button class="arrows__btn"><-</button>
      <button class="arrows__btn">-></button>
    </div>
`;

// $result render arrows to navigate between all screens with mouse

const renderScreenNav = () => {
  const template = document.createElement(`template`);

  template.innerHTML = screensNavMarkup;

  const arrows = template.content.querySelectorAll(`.arrows__btn`);

  arrows[0].addEventListener(`click`, () => renderPreviousScreen());
  arrows[1].addEventListener(`click`, () => renderNextScreen());

  bodyNode.appendChild(template.content);
};

//  $result adds pointed node to #main
//  @param {number} node pointer - number of node from orderedScreens array

const renderScreen = (number) => {

  if (number > 0 && number <= screens.length) {
    main.innerHTML = ``;
    main.appendChild(screens[number - 1]);

    currentScreenNumber = number;
  }

};

// $listener switches screens on left/right keydown

const onDocumentKeydown = (evt) => {
  switch (evt.keyCode) {
    case KeyCodes.AR_LEFT:
      renderPreviousScreen();
      break;
    case KeyCodes.AR_RIGHT:
      renderNextScreen();
      break;
  }
};

// $result renders previous screen if exist

const renderPreviousScreen = () => {
  if (currentScreenNumber > 1) {
    currentScreenNumber--;
    renderScreen(currentScreenNumber);
  }
};

// $result render nextScreen if exist

const renderNextScreen = () => {
  if (currentScreenNumber < screens.length) {
    currentScreenNumber++;
    renderScreen(currentScreenNumber);
  }
};

// listeners

document.addEventListener(`keydown`, onDocumentKeydown);

// execute code

renderScreen(2);
renderScreenNav();
