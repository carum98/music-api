const axios = require("axios");

const lyricUrl = (artist, title) => {
  const artistKebabCase = artist.replace(/\s/g, "-");
  const titleKebabCase = title.replace(/\s/g, "-");

  return `/lyrics/${artistKebabCase}/${titleKebabCase}`;
};

module.exports = async (id) => {
  const url = process.env.GENIUS_URL;

  const {
    data: {
      response: { song },
    },
  } = await axios.get(`${url}/songs/${id}`, {
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
      id: song.primary_artist.id,
      name: song.primary_artist.name,
      image_url: song.primary_artist.image_url,
    },
    media: song.media,
    lyrics: lyricUrl(song.primary_artist.name, song.title),
  };
};
