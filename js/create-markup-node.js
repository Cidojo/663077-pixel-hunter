// @param {markup} html string
// $return dom node

const createMarkupNode = (markup) => {
  const nestElement = document.createElement(`main`);

  nestElement.innerHTML = markup.trim();

  return nestElement;
};

export default createMarkupNode;
