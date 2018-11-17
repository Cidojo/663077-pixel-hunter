import insertHeader from './screen-header.js';

const main = document.querySelector(`#main`);

// @param {template} screen node to render
// @param {common} boolean, true if header is needed
// @param {misc} boolean, true if header incudes misc info (life, timer, etc.), transfered to inner fun
// $result adds pointed node to #main

const renderScreen = (template, common, misc) => {
  main.innerHTML = ``;

  if (common) {
    template.insertBefore(insertHeader(misc), template.firstChild);
  }

  main.appendChild(template);
};

export default renderScreen;
