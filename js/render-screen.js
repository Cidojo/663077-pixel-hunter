const body = document.querySelector(`body`);
let main = body.querySelector(`#main`);
const mainId = main.id;

// @param {template} screen node to render
// $result adds pointed node to #main

export default (node) => {
  main.id = ``;
  node.id = mainId;

  body.replaceChild(node, main);

  main = node;
};
