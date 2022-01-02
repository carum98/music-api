const express = require("express");
const router = express.Router();

const songs = require("../controllers/songs");
const search = require("../controllers/search");
const lyrics = require("../controllers/lyrics");

router.get("/search", search);

router.get("/songs/:source/:id", songs);

router.get("/lyrics/:artist/:title", lyrics);

module.exports = router;
