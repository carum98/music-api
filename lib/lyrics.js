const axios = require("axios");
const parser = require("node-html-parser");

module.exports = async (artist, title) => {
  const lyricGenius = await getLyricGenius(artist, title);

  return {
    genius: lyricGenius,
  };
};

const getLyricGenius = async (artist, title) => {
  const response = await axios.get(
    `https://genius.com/${artist}-${title}-lyrics`
  );

  const html = parser.parse(response.data);
  const containers = html.querySelectorAll("div[class^='Lyrics__Container']");

  let lyric = "";

  containers.forEach(({ childNodes }) => {
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
