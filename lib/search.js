const axios = require("axios");

module.exports = async (value) => {
  const url = process.env.GENIUS_URL;

  const {
    data: {
      response: { hits },
    },
  } = await axios.get(`${url}/search`, {
    params: {
      q: value,
    },
    headers: {
      Authorization: "Bearer " + process.env.GENIUS_TOKEN,
    },
  });

  return hits.map(({ result }) => ({
    artist: {
      id: result.primary_artist.id,
      name: result.primary_artist.name,
      image_url: result.primary_artist.image_url,
    },
    title: result.title,
    song: `/songs/${result.id}`,
    type: result.primary_artist.name.includes(value) ? "artist" : "song",
  }));
};
