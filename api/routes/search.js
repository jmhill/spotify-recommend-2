var router = require('express').Router();
var Spotify = require('../services/spotify/spotify-search');

router.get('/:name', Spotify);

module.exports = router;
