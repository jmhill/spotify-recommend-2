var router = require('express').Router();
var getFromApi = require('../services/getFromApi');
var Spotify = require('../services/spotify-search');

router.get('/:name', Spotify);

module.exports = router;
