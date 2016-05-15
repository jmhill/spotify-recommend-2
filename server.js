process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 8080;

var express = require('./config/express');

var app = express();
app.listen(port);
