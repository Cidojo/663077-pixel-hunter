const body = document.querySelector(`body`);
let main = body.querySelector(`#main`);
const mainId = main.id;

// @param {template} screen node to render
// $result adds pointed node to #main

export default (template) => {
  main.id = ``;
  template.id = mainId;

  body.replaceChild(template, main);

  main = template;
};
