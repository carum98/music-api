const axios = require("axios");
const spotifyToken = require("../util/spotifyToken");
const lyricUrl = require("../util/lyricUrl");

/**
 * @swagger
 * components:
 *  schemas:
 *     Song:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         thumbnail_url:
 *           type: string
 *         artist:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             image_url:
 *               type: string
 *         media:
 *           type: array
 *         preview_url:
 *           type: string
 *         lyrics:
 *           type: string
 *       required:
 *         - title
 *         - thumbnail_url
 *         - artist
 *         - media
 *         - lyrics
 *       example:
 *         title: "Shadow Moses"
 *         thumbnail_url: "https://images.genius.com/64c7d35c8d427522574cbf7773084ee3.1000x1000x1.jpg"
 *         artist:
 *           name: "Bring Me The Horizon"
 *           image_url: "https://images.genius.com/64c7d35c8d427522574cbf7773084ee3.1000x1000x1.jpg"
 *         media:
 *           - "https://p.scdn.co/mp3-preview/b9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9"
 *           - "https://p.scdn.co/mp3-preview/b9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9"
 *         preview_url: "https://p.scdn.co/mp3-preview/7ca68006ce5326244c627241d39e8469508ae4c5?cid=e71927db796d4b57a7387aba0ef786a8"
 *         lyrics: "/lyrics/Bring-Me-The-Horizon/Shadow-Moses"
 */

/**
 * Get song
 */
module.exports = async (req, res) => {
  const { source, id } = req.params;
  let data;

  if (source === "genius") {
    data = await getSongGenius(id);
  } else if (source === "spotify") {
    data = await getSongSpotify(id);
  }

  res.send(data);
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
