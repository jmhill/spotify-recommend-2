var router = require('express').Router();
var Spotify = require('../services/spotify/spotify-search');

router.get('/:name',
  Spotify.getArtist,
  Spotify.getRelatedArtists,
  function(request, response, next) {
    var artistRequests = [];
    request.artist.related.forEach(function(relatedArtist){
      artistRequests.push(new Promise(function(resolve, reject) {
        Spotify.lookupTopTracks(relatedArtist.id, function(trackList) {
          relatedArtist.tracks = trackList.tracks;
          resolve();
        });    
      }));
    });
    Promise.all(artistRequests).then(function() {
      next();
    });
  },
  function(request, response) {
    var artist = request.artist;
    response.json(artist);
  }
);

module.exports = router;
