const axios = require("axios");

const extractLyrics = require("../util/extractLyrics");
const formatLyric = require("../util/formatLyric");

/**
 * @swagger
 * components:
 *  schemas:
 *     Lyrics:
 *       type: object
 *       properties:
 *         genius:
 *           type: object
 *           properties:
 *             lyric:
 *               type: string
 *             source:
 *               type: string
 *         songLyrics:
 *           type: object
 *           properties:
 *             lyric:
 *               type: string
 *             source:
 *               type: string
 *         lyricMania:
 *           type: object
 *           properties:
 *             lyric:
 *               type: string
 *             source:
 *               type: string
 *       required:
 *         - genius
 *         - songLyrics
 *         - lyricMania
 *       example:
 *         genius:
 *           lyric: "[Verse 1]\nTurn the lights down, let me think clearly\nEverything is such a blur these days\nMade the right sound ..."
 *           source: "https://genius.com/beartooth-the-past-is-dead-lyrics"
 *         songLyrics:
 *           lyric: "[Verse 1]\nTurn the lights down, let me think clearly\nEverything is such a blur these days\nMade the right sound ..."
 *           source: "http://www.songlyrics.com/beartooth/the-past-is-dead-lyrics"
 *         lyricMania:
 *           lyric: "[Verse 1]\nTurn the lights down, let me think clearly\nEverything is such a blur these days\nMade the right sound ..."
 *           source: "https://www.lyricsmania.com/the_past-is-dead_lyrics_beartooth.html"
 */

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
module.exports = async (req, res) => {
  const { artist, title } = req.params;

  try {
    const [genius, songLyrics, lyricMania] = await Promise.all([
      getLyricGenius(artist, title),
      getSongLyrics(artist, title),
      getLyricMania(artist, title),
    ]);

    const data = {
      genius,
      songLyrics,
      lyricMania,
    };

    res.send(data);
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
 * @returns - lyrics
 */
const getLyricGenius = async (artist, title) => {
  const url = `${geniusURL}/${artist}-${title}-lyrics`;
  let lyric = "";

  try {
    const { data } = await axios.get(url);
    const htmlLyric = extractLyrics(data, "div[class^='Lyrics__Container']");

    lyric = formatLyric(htmlLyric);
  } catch {
    console.log("getLyricGenius ERROR");
  } finally {
    return {
      lyric,
      source: url,
    };
  }
};

/**
 * Get lyrics from a given artist and title
 * source: [SongLyrics](http://www.songlyrics.com)
 *
 * @param {string} artist - artist name
 * @param {string} title - song title
 * @returns - lyrics
 */
const getSongLyrics = async (artist, title) => {
  const url = `${songLyricsURL}/${artist}/${title}-lyrics`;
  let lyric = "";

  try {
    const { data } = await axios.get(url);
    const htmlLyrics = extractLyrics(data, "p[id='songLyricsDiv']");

    lyric = formatLyric(htmlLyrics);
  } catch {
    console.log("getSongLyrics ERROR");
  } finally {
    return {
      lyric,
      source: url,
    };
  }
};

/**
 * Get lyrics from a given artist and title
 * source: [LyricMania](https://www.lyricsmania.com)
 *
 * @param {string} artist - artist name
 * @param {string} title - song title
 * @returns - lyrics
 */
const getLyricMania = async (artist, title) => {
  const artistX = artist.replace("-", "_");
  const titleX = title.replace("-", "_");

  const url = `${lyricManiaURL}/${titleX}_lyrics_${artistX}.html`;
  let lyric = "";

  try {
    const { data } = await axios.get(url);
    const htmlLyrics = extractLyrics(data, "div[class='lyrics-body']", [
      "#video-musictory",
    ]);

    lyric = formatLyric(htmlLyrics);
  } catch {
    console.log("getSongLyrics ERROR");
  } finally {
    return {
      lyric,
      source: url,
    };
  }
};
