import insertHeader from './screen-header.js';

const body = document.querySelector(`body`);
let main = body.querySelector(`#main`);

// @param {template} screen node to render
// @param {common} boolean, true if header is needed
// @param {misc} boolean, true if header incudes misc info (life, timer, etc.), transfered to inner fun
// $result adds pointed node to #main

const renderScreen = (template, common, misc) => {

  template.classList.add(`central`);
  template.id = `main`;

  if (common) {
    template.insertBefore(insertHeader(misc), template.firstChild);
  }

  body.replaceChild(template, main);

  main = template;
};

export default renderScreen;
