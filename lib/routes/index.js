const express = require("express");
const router = express.Router();

const songs = require("../songs");
const search = require("../search");
const lyrics = require("../lyrics");

router.get("/search", async (req, res) => {
  const { q } = req.query;
  const data = await search(q);

  res.send(data);
});

router.get("/songs/:source/:id", async (req, res) => {
  const { source, id } = req.params;
  const data = await songs(source, id);

  res.send(data);
});

router.get("/lyrics/:artist/:title", async (req, res) => {
  const { artist, title } = req.params;
  const data = await lyrics(artist, title);

  res.send(data);
});

module.exports = router;
