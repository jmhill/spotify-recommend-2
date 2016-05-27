var spotifyApi = require('./spotify-api-query');

function getArtist(request, response, next) {
  var queryArgs = {
    q: request.params.name,
    limit: 1,
    type: 'artist'
  };
  spotifyApi.get('search', queryArgs, function(searchResult) {
    request.artist = searchResult.artists.items[0];
    next();
  });
}

function getRelatedArtists(request, response, next) {
  var artistId = request.artist.id;
  var endpoint = 'artists/' + artistId + '/related-artists';
  var queryArgs = {};
  spotifyApi.get(endpoint, queryArgs, function(artistList) {
    request.artist.related = artistList.artists;
    next();
  });   
}

function lookupTopTracks(artistId, callback) {
  var endpoint = 'artists/' + artistId + '/top-tracks';
  var queryArgs = {
    country: 'US'
  };
  spotifyApi.get(endpoint, queryArgs, function(trackList) {
    callback(trackList);
  });
}

exports.getArtist = getArtist;
exports.getRelatedArtists = getRelatedArtists;
exports.lookupTopTracks = lookupTopTracks;