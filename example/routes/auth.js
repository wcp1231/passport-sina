var passport = require('passport')
  , crypto = require('crypto');

exports.before = {
    'index' : function(req, res, next) {
        req.session = req.session || {};
        req.session.auth_state = crypto.createHash('sha1').update(-(new Date()) + '').digest('hex');
        passport.authenticate('sina', { 'state': req.session.auth_state })(req, res, next);
    },
    'callback' : function(req, res, next) {
        if(req.session && req.session.auth_state && req.session.auth_state === req.query.state) {
            passport.authenticate('sina', { failureRedirect: '/' })(req, res, next);
        } else {
            next(new Error('Auth State Mismatch'));
        }
    }
};

exports.index = function(req, res) {};
exports.callback = function(req, res) {
  res.redirect('/');
}