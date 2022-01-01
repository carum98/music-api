/**
 * Format lyric from HTML to plain text
 *
 * @param {HTMLElement[]} lyrics
 * @returns {string}
 */
module.exports = (lyrics) => {
  let lyric = "";

  lyrics.forEach(({ childNodes }) => {
    childNodes.forEach(({ tagName, rawText }) => {
      if (tagName === "BR") {
        lyric += "\n";
      } else {
        lyric += rawText;
      }
    });
  });

  return lyric;
};
