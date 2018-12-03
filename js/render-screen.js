import insertHeader from './screen-header.js';

const body = document.querySelector(`body`);
let main = body.querySelector(`#main`);
const mainId = main.id;

// @param {template} screen node to render
// @param {common} boolean, true if header is needed
// @param {misc} boolean, true if header incudes misc info (life, timer, etc.), transfered to inner fun
// $result adds pointed node to #main

const renderScreen = (screenState) => {
  main.id = ``;
  template.id = mainId;

  if (screenState) {
    template.insertBefore(insertHeader(misc), template.firstChild);
  }

  body.replaceChild(template, main);

  main = template;
};

export default renderScreen;
