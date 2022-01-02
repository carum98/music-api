const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(express.json());

const songs = require("./lib/songs");
const search = require("./lib/search");
const lyrics = require("./lib/lyrics");

app.get("/", (req, res) => res.send("Hello World!, Carlos"));

app.get("/search", async (req, res) => {
  const { q } = req.query;
  const response = await search(q);

  res.json(response);
});

app.get("/songs/:source/:id", async (req, res) => {
  const { source, id } = req.params;
  const response = await songs(source, id);

  res.send(response);
});

app.get("/lyrics/:artist/:title", async (req, res) => {
  const { artist, title } = req.params;
  const response = await lyrics(artist, title);

  res.send(response);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
