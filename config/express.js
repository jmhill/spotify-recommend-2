var express = require('express');

module.exports = function() {
  var app = express();

  app.use(express.static('public'));

  require('../api/index.js')(app);

  return app;
};
