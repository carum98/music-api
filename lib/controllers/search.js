const axios = require("axios");
const spotifyToken = require("../util/spotifyToken");
const lyricUrl = require("../util/lyricUrl");

/**
 * @swagger
 * components:
 *   schemas:
 *     Search:
 *       type: object
 *       properties:
 *         artist:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             image_url:
 *               type: string
 *         title:
 *           type: string
 *         song_url:
 *           type: string
 *         lyrics_url:
 *           type: string
 *       required:
 *         - artist
 *         - title
 *         - song_url
 *         - lyrics_url
 *       example:
 *         artist:
 *           name: "Bring Me The Horizon"
 *           image_url: "https://images.genius.com/64c7d35c8d427522574cbf7773084ee3.1000x1000x1.jpg"
 *         title: "Shadow Moses"
 *         song_url: "/songs/spotify/68osIGtVjM7QWVe6pazLHj"
 *         lyrics_url: "/lyrics/Bring-Me-The-Horizon/Shadow-Moses"
 */

/**
 * Search
 */
module.exports = async (req, res) => {
  const { q: value } = req.query;

  const [genius, spotify] = await Promise.all([
    searchGenius(value),
    searchSpotify(value),
  ]);

  const data = {
    genius,
    spotify,
  };

  res.send(data);
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
