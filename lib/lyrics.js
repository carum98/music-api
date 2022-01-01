const axios = require("axios");

const extractLyrics = require("./util/extractLyrics");
const formatLyric = require("./util/formatLyric");

/**
 * Sources
 */
const geniusURL = "https://genius.com";
const songLyricsURL = "http://www.songlyrics.com";
const lyricManiaURL = "https://www.lyricsmania.com";

/**
 * Get lyrics from a given artist and title
 *
 * @param {string} artist - artist name
 * @param {string} title - song title
 * @returns lyrics
 */
module.exports = async (artist, title) => {
  try {
    const [genius, songLyrics, lyricMania] = await Promise.all([
      getLyricGenius(artist, title),
      getSongLyrics(artist, title),
      getLyricMania(artist, title),
    ]);

    return {
      genius,
      songLyrics,
      lyricMania,
    };
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get lyrics from a given artist and title
 * source: [Genius](https://genius.com)
 *
 * @param {string} artist - artist name
 * @param {string} title - song title
 * @returns {string} - lyrics
 */
const getLyricGenius = async (artist, title) => {
  try {
    const { data } = await axios.get(`${geniusURL}/${artist}-${title}-lyrics`);
    const lyrics = extractLyrics(data, "div[class^='Lyrics__Container']");

    return formatLyric(lyrics);
  } catch {
    console.log("getLyricGenius ERROR");

    return "";
  }
};

/**
 * Get lyrics from a given artist and title
 * source: [SongLyrics](http://www.songlyrics.com)
 *
 * @param {string} artist - artist name
 * @param {string} title - song title
 * @returns {string} - lyrics
 */
const getSongLyrics = async (artist, title) => {
  try {
    const { data } = await axios.get(
      `${songLyricsURL}/${artist}/${title}-lyrics`
    );
    const lyrics = extractLyrics(data, "p[id='songLyricsDiv']");

    return formatLyric(lyrics);
  } catch {
    console.log("getSongLyrics ERROR");

    return "";
  }
};

/**
 * Get lyrics from a given artist and title
 * source: [LyricMania](https://www.lyricsmania.com)
 *
 * @param {string} artist - artist name
 * @param {string} title - song title
 * @returns {string} - lyrics
 */
const getLyricMania = async (artist, title) => {
  try {
    const artistX = artist.replace("-", "_");
    const titleX = title.replace("-", "_");

    const { data } = await axios.get(
      `${lyricManiaURL}/${titleX}_lyrics_${artistX}.html`
    );
    const lyrics = extractLyrics(data, "div[class='lyrics-body']", [
      "#video-musictory",
    ]);

    return formatLyric(lyrics);
  } catch {
    console.log("getSongLyrics ERROR");

    return "";
  }
};
