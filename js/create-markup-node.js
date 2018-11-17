// @param {markup} html string
// $return dom node

const createMarkupFragment = (markup) => {
  const nestElement = document.createElement(`div`);

  nestElement.innerHTML = markup.trim();

  return nestElement;
};

export default createMarkupFragment;
