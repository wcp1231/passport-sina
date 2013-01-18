exports.user = require('./user');
exports.auth = require('./auth');

exports.index = function(req, res){
  res.redirect('/user');
};