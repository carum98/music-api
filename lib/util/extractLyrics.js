const parser = require("node-html-parser");

/**
 * Extracts lyrics from a given html string
 *
 * @param {string} data - html string
 * @param {string} selector - css selector
 * @param {string[]} selectorDelete - css selectors to delete
 * @returns {HTMLElement[]}
 */
module.exports = (data, selector, selectorDelete = []) => {
  const html = parser.parse(data);

  if (selectorDelete.length > 0) {
    selectorDelete.forEach((selectorDelete) => {
      html.querySelector(selectorDelete).remove();
    });
  }

  return html.querySelectorAll(selector);
};
