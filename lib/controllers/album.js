const axios = require("axios");
const spotifyToken = require("../util/spotifyToken");
const lyricUrl = require("../util/lyricUrl");

module.exports = async (req, res) => {
  const { source, id } = req.params;
  let data;

  if (source === "genius") {
    data = await getAlbumGenius(id);
  } else if (source === "spotify") {
    data = await getAlbumSpotify(id);
  }

  res.send(data);
};

const getAlbumGenius = async (id) => {
  const {
    data: {
      response: { tracks },
    },
  } = await axios.get(`${process.env.GENIUS_URL}/albums/${id}/tracks`, {
    headers: {
      Authorization: "Bearer " + process.env.GENIUS_TOKEN,
    },
  });

  return {
    songs: tracks.map(({ song }) => ({
      artist: {
        name: song.primary_artist.name,
        image_url: "",
      },
      title: song.title,
      song_url: `/songs/genius/${song.id}`,
      lyrics_url: lyricUrl(song.primary_artist.name, song.title),
    })),
  };
};

const getAlbumSpotify = async (id) => {
  const token = await spotifyToken();

  const {
    data: { tracks: items },
  } = await axios.get(`${process.env.SPOTIFY_URL}/albums/${id}`, {
    params: {
      market: "CR",
    },
    headers: {
      Authorization: token,
    },
  });

  return {
    songs: items.items.map((item) => ({
      artist: {
        name: item.artists[0].name,
        image_url: "",
      },
      title: item.name,
      song_url: `/songs/spotify/${item.id}`,
      lyrics_url: lyricUrl(item.artists[0].name, item.name),
    })),
  };
};
