var express = require('express');
var router = express.Router();
var getFromApi = require('./services/getFromApi');

var app = express()
app.use(express.static('public'));

app.get('/search/:name', function(req, res) {
	var searchReq = getFromApi('search', {
		q: req.params.name,
		limit: 1,
		type: 'artist'
	});


	searchReq.on('end', function(item) {
		var artist = item.artists.items[0];

		if (artist) {
			var relatedReq = getFromApi('artists/' + artist.id + '/related-artists');
			relatedReq.on('end', function(list) {
				artist.related = list.artists;
				res.json(artist);
			});
			relatedReq.on('error', function() {
				res.sendStatus(404);
			});
		} else {
			var artist = { name: 'No matching artist found!'};
			res.json(artist);
		}
	});

	searchReq.on('error', function() {
		res.sendStatus(404);
	});
});

app.listen(8080);
