var passport_sina = require('passport-sina');
var sinaStrategy = module.exports = new passport_sina({
    clientID: 'your app key here'
  , clientSecret: 'your app secret here'
  , callbackURL: 'your callback url here'
//  , requireState: false
//  , scope: ['statuses_to_me_read'
//          , 'follow_app_official_microblog']
},
function(accessToken, refreshToken, profile, callback) {
    process.nextTick(function () {
        return callback(null, profile);
    });
});
