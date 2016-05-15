var router = require('express').Router();
var getFromApi = require('../../services/getFromApi');

router.get('/:name', function(req, res) {
  // This is the initial search request based on user input
  var searchReq = getFromApi('search', {
    q: req.params.name,
    limit: 1,
    type: 'artist'
  });

  // We have to wait for the initial Spotify artist search to finish before we
  // start messing with the related artist info.
  searchReq.on('end', function(item) {
    // For simplicity's sake, we will just use the first artist found in the search results
    var artist = item.artists.items[0];
    // We only want to execute the rest of the code if the search gives us a result
    if (artist) {
      // Spotify API call to get related artists
      var relatedReq = getFromApi('artists/' + artist.id + '/related-artists');
      // Once we get the related artists, we can start looking up their tracks
      relatedReq.on('end', function(list) {
        artist.related = list.artists;
        var trackLookupCount = 0;
        var totalRelatedArtists = artist.related.length;
        // lookupComplete will check to see if we've looked up all the related artists' tracks
        // If we have, then send the artist object back as JSON
        var lookupComplete = function() {
          if (trackLookupCount === totalRelatedArtists) {
            res.json(artist);
          }
        };

        // We will look up each of the related artists' tracks here.
        artist.related.forEach(function(relatedArtist) {
          // Each related artist will require an API call
          var topTracksReq = getFromApi(
            'artists/' + relatedArtist.id + '/top-tracks',
            { country: 'US' }
          );
          // Once the track lookup API call is complete, we can attach those
          // tracks to the related artist object and check our lookup status.
          topTracksReq.on('end', function(trackList) {
            relatedArtist.tracks = trackList.tracks;
            trackLookupCount++;
            lookupComplete();
          });

          topTracksReq.on('error', function() {
            res.sendStatus(404);
          });
        });
      });

      relatedReq.on('error', function() {
        res.sendStatus(404);
      });
    } else {
      // If our initial search doesn't turn up an artist,
      // (for example, if the user inputs gibberish)
      // we return a placeholder artist object with a
      // friendly error message in the name property.
      artist = { name: 'No matching artist found!'};
      res.json(artist);
    }
  });

  searchReq.on('error', function() {
    res.sendStatus(404);
  });
});

module.exports = router;
