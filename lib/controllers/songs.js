const axios = require("axios");
const spotifyToken = require("../util/spotifyToken");
const lyricUrl = require("../util/lyricUrl");

/**
 * Get song information from a give id
 *
 * @param {string} source - source of the song
 * @param {string} id - song id
 */
module.exports = async (source, id) => {
  if (source === "genius") {
    return await getSongGenius(id);
  } else if (source === "spotify") {
    return await getSongSpotify(id);
  }
};

/**
 * Get song information from a give id from [Genius](https://genius.com)
 * @param {string} id
 */
const getSongGenius = async (id) => {
  const {
    data: {
      response: { song },
    },
  } = await axios.get(`${process.env.GENIUS_URL}/songs/${id}`, {
    params: {
      text_format: "plain",
    },
    headers: {
      Authorization: "Bearer " + process.env.GENIUS_TOKEN,
    },
  });

  return {
    title: song.title,
    thumbnail_url: song.header_image_thumbnail_url,
    artist: {
      name: song.primary_artist.name,
      image_url: song.primary_artist.image_url,
    },
    media: song.media,
    lyrics: lyricUrl(song.primary_artist.name, song.title),
  };
};

/**
 * Get song information from a give id from [Spotify](https://www.spotify.com/)
 *
 * @param {string} id - song id
 */
const getSongSpotify = async (id) => {
  const token = await spotifyToken();
  const {
    data: {
      name,
      artists,
      preview_url,
      album: { images },
      external_urls: { spotify },
    },
  } = await axios.get(`${process.env.SPOTIFY_URL}/tracks/${id}`, {
    params: {
      market: "CR",
    },
    headers: {
      Authorization: token,
    },
  });

  return {
    title: name,
    thumbnail_url: images[0].url,
    artist: {
      name: artists[0].name,
      image_url: "",
    },
    media: [
      {
        provider: "spotify",
        type: "audio",
        url: spotify,
      },
    ],
    preview_url,
    lyrics: lyricUrl(artists[0].name, name),
  };
};
