'use strict';

//  MODULE {render-screens.js}

const KEY_CODES = {
  ESC: 27,
  AR_LEFT: 37,
  AR_RIGHT: 39,
  ENTER: 13
};

const main = document.querySelector(`#main`);
const screenNodes = document.querySelectorAll(`template`);
const bodyNode = document.querySelector(`body`);

const orderedScreens = Array.from(screenNodes)
    .map((it) => new Screen(it))
    .sort((current, next) => current.order - next.order);

// $Constructor creates screen object
// @param {node} screen node

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

function renderScreenNav() {
  const screensNavFragment = document.createDocumentFragment();
  const template = document.createElement(`template`);

  template.innerHTML = screensNavMarkup;
  screensNavFragment.appendChild(template.content);

  const arrows = screensNavFragment.querySelectorAll(`.arrows__btn`);

  arrows[0].addEventListener(`click`, () => renderPreviousScreen());
  arrows[1].addEventListener(`click`, () => renderNextScreen());

  bodyNode.appendChild(screensNavFragment);
}


// $result Constructor, create a screen object on a screen template basis
// @param {node} screen template node

function Screen(node) {
  this.node = node;
  this.id = node.id;

  (() => {
    switch (this.id) {
      case (`intro`):
        this.order = 1;
        this.addListeners = addEventsOnIntro;
        break;
      case (`greeting`):
        this.order = 2;
        this.addListeners = addEventsOnGreet;
        break;
      case (`rules`):
        this.order = 3;
        this.addListeners = addEventsOnRules;
        break;
      case (`game-1`):
        this.order = 4;
        break;
      case (`game-2`):
        this.order = 5;
        break;
      case (`game-3`):
        this.order = 6;
        break;
      case (`stats`):
        this.order = 7;
        break;
      case (`modal-error`):
        this.order = 8;
        break;
      case (`modal-confirm`):
        this.order = 9;
        break;
    }
  })();
}

//  $result adds pointed node to #main
//  @param {number} node pointer - number of node from orderedScreens array
//  @param {eventFunction} custom function for each node that adds neccessary eventListeners

function renderScreen(number) {
  const wrapHiddenTemplate = (it) => {
    const shadow = document.createElement(`div`);
    const content = it.content.cloneNode(true);
    shadow.appendChild(content);
    return shadow.cloneNode(true);
  };

  if (number > 0 && number <= screenNodes.length) {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(wrapHiddenTemplate(orderedScreens[number - 1].node));

    if (orderedScreens[number - 1].addListeners) {
      orderedScreens[number - 1].addListeners(fragment);
    }

    emptyDomElement(main);
    main.appendChild(fragment);
  }

  currentScreenNumber = number;
}

// $listener switches screens on left/right keydown

function onDocumentKeydown(evt) {
  switch (evt.keyCode) {
    case KEY_CODES.AR_LEFT:
      renderPreviousScreen();
      break;
    case KEY_CODES.AR_RIGHT:
      renderNextScreen();
      break;
  }
}

function renderPreviousScreen() {
  if (currentScreenNumber > 1) {
    currentScreenNumber--;
    renderScreen(currentScreenNumber);
  }
}

function renderNextScreen() {
  if (currentScreenNumber < orderedScreens.length) {
    currentScreenNumber++;
    renderScreen(currentScreenNumber);
  }
}

document.addEventListener(`keydown`, onDocumentKeydown);

renderScreen(2);
renderScreenNav();

//  MODULE {dom-manager.js}

//  $result  removes DOM element children
//  @param {element} DOM element to be cleaned

function emptyDomElement(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}

// MODULE {event-manager.js}

function addEventsOnIntro(node) {
  let asterisk = node.querySelector(`.asterisk`);

  asterisk.addEventListener(`click`, () => renderScreen(2));
}

function addEventsOnGreet(node) {
  let asterisk = node.querySelector(`.asterisk`);

  asterisk.addEventListener(`click`, () => renderScreen(3));
}

function addEventsOnRules(node) {
  let rulesInput = node.querySelector(`.rules__input`);
  let rulesButton = node.querySelector(`.rules__button`);

  function onRulesButtonClick(evt) {
    evt.preventDefault();
    renderScreen(4);
  }

  rulesInput.addEventListener(`input`, () => {
    if (rulesInput.value) {
      rulesButton.disabled = false;
      rulesButton.addEventListener(`click`, onRulesButtonClick);
    } else {
      rulesButton.disabled = true;
      rulesButton.removeEventListener(`click`, onRulesButtonClick);
    }
  });
}
