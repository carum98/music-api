const axios = require("axios");

module.exports = async () => {
  const client_credentials =
    process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET;

  const { data } = await axios("https://accounts.spotify.com/api/token", {
    method: "post",
    headers: {
      Authorization:
        "Basic " + Buffer.from(client_credentials).toString("base64"),
    },
    data: "grant_type=client_credentials",
  });

  return "Bearer " + data.access_token;
};
