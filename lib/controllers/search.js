const axios = require("axios");
const spotifyToken = require("../util/spotifyToken");
const lyricUrl = require("../util/lyricUrl");

/**
 * Search
 *
 * @param {string} value - search value
 * @returns
 */
module.exports = async (value) => {
  const [genius, spotify] = await Promise.all([
    searchGenius(value),
    searchSpotify(value),
  ]);

  return {
    genius,
    spotify,
  };
};

/**
 * Search value in [Genius](https://genius.com)
 *
 * @param {string} value - search value
 */
const searchGenius = async (value) => {
  const {
    data: {
      response: { hits },
    },
  } = await axios.get(`${process.env.GENIUS_URL}/search`, {
    params: {
      q: value,
    },
    headers: {
      Authorization: "Bearer " + process.env.GENIUS_TOKEN,
    },
  });

  return hits.map(({ result }) => ({
    artist: {
      name: result.primary_artist.name,
      image_url: result.primary_artist.image_url,
    },
    title: result.title,
    song_url: `/songs/genius/${result.id}`,
    lyrics_url: lyricUrl(result.primary_artist.name, result.title),
    type: result.primary_artist.name.includes(value) ? "artist" : "song",
  }));
};

/**
 * Search value in [Spotify](https://www.spotify.com/)
 *
 * @param {string} value - search value
 */
const searchSpotify = async (value) => {
  const token = await spotifyToken();
  const {
    data: {
      tracks: { items },
    },
  } = await axios.get(`${process.env.SPOTIFY_URL}/search`, {
    params: {
      q: value,
      type: "track",
    },
    headers: {
      Authorization: token,
    },
  });

  return items.map(({ id, name, artists }) => ({
    artist: {
      name: artists[0].name,
      image_url: "",
    },
    title: name,
    song_url: `/songs/spotify/${id}`,
    lyrics_url: lyricUrl(artists[0].name, name),
    type: "song",
  }));
};
