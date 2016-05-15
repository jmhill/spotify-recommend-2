module.exports = function(app) {
  app.use('/search', require('./routes/search'));
};
