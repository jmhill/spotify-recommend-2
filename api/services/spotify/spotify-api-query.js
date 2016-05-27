var unirest = require('unirest');

exports.get = function (endpoint, args, callback) {
	unirest.get('https://api.spotify.com/v1/' + endpoint)
		.qs(args)
		.end(function(response){
			callback(response.body);
		});
};
