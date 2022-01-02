/**
 *	Create a URL lyric.
 *
 * @param {string} artist - artist name
 * @param {string} title - song title
 * @returns {string} - URL lyric
 */
module.exports = (artist, title) => {
  const artistKebabCase = artist.replace(/\s/g, "-");
  const titleKebabCase = title.replace(/\s/g, "-");

  return `/lyrics/${artistKebabCase}/${titleKebabCase}`;
};
