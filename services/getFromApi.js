var events = require('events');
var unirest = require('unirest');

var getFromApi = function (endpoint, args) {
	var emitter = new events.EventEmitter();
	unirest.get('https://api.spotify.com/v1/' + endpoint)
		.qs(args)
		.end(function(response){
			emitter.emit('end', response.body);
		});
	return emitter;
};

module.exports = getFromApi;