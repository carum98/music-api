const express = require("express");
const router = express.Router();

const songs = require("../controllers/songs");
const search = require("../controllers/search");
const lyrics = require("../controllers/lyrics");
const album = require("../controllers/album");

/**
 * @swagger
 * /search:
 *  get:
 *   summary: Search songs.
 *   description: Search songs in [Spotify](https://www.spotify.com) and [Genius](https://genius.com).
 *   parameters:
 *   - in: query
 *     name: q
 *     description: Search value.
 *     schema:
 *      type: string
 *     required: true
 *   responses:
 *     "200":
 *      description: A successful response
 *      content:
 *        application/json:
 *          schema:
 *            type:
 *            $ref: '#/components/schemas/Search'
 */
router.get("/search", search);

/**
 * @swagger
 * /songs/{source}/{id}:
 *  get:
 *   summary: Get song.
 *   description: Get song information from a give id from [Spotify](https://www.spotify.com) or [Genius](https://genius.com).
 *   parameters:
 *   - in: path
 *     name: source
 *     description: Source of song.
 *     required: true
 *     schema:
 *       type: string
 *       enum:
 *         - spotify
 *         - genius
 *   - in: path
 *     name: id
 *     description: ID of song.
 *     required: true
 *     schema:
 *       type: string
 *   responses:
 *     "200":
 *      description: A successful response
 *      content:
 *        application/json:
 *          schema:
 *            type:
 *            $ref: '#/components/schemas/Song'
 */
router.get("/songs/:source/:id", songs);

/**
 * @swagger
 * /lyrics/{artist}/{title}:
 *   get:
 *     summary: Get lyrics.
 *     description: Get lyrics from diferets sources.
 *     parameters:
 *     - in: path
 *       name: artist
 *       description: Artist of song.
 *       required: true
 *       schema:
 *         type: string
 *     - in: path
 *       name: title
 *       description: Title of song.
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       "200":
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               $ref: '#/components/schemas/Lyrics'
 */
router.get("/lyrics/:artist/:title", lyrics);

/**
 * @swagger
 * /album/{source}/{id}:
 *   get:
 *    summary: Get album songs.
 *    parameters:
 *    - in: path
 *      name: source
 *      description: Source of album.
 *      required: true
 *      schema:
 *        type: string
 *        enum:
 *          - spotify
 *          - genius
 *    - in: path
 *      name: id
 *      description: ID of album.
 *      required: true
 *      schema:
 *      type: string
 *    responses:
 *      "200":
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type:
 *              $ref: '#/components/schemas/Search'
 *
 */
router.get("/album/:source/:id", album);

module.exports = router;
