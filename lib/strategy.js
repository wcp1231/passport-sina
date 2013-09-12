/**
 * 在使用Geddy-passport时，发现无法导入Strategy模块，对应官方的twitter插件进行了结构调整，代码并没有做修改
 * User: lic
 * Date: 13-9-12
 * Time: 下午1:04
 * To change this template use File | Settings | File Templates.
 */
var util = require('util')
    , config = require('./config')
    , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
    , InternalOAuthError = require('passport-oauth').InternalOAuthError;

function Strategy(options, verify) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || config.authorizationURL;
    options.tokenURL = options.tokenURL || config.tokenURL;
    options.scopeSeparator = options.scopeSeparator || config.scopeSeparator;
    config.requireState = options.requireState === undefined ? config.requireState : options.requireState;

    OAuth2Strategy.call(this, options, verify);
    this.name = config.name;
}

util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.authorizationParams = function(options) {
    if(config.requireState && !options.state) {
        throw new Error('Authentication Parameter `state` Required');
    } else {
        return options;
    }
}

Strategy.prototype.userProfile = function(accessToken, callback) {
    var self = this;
    this._oauth2.getProtectedResource(config.getuidAPI, accessToken, function(err, body, res) {
        if (err) return callback(new InternalOAuthError('', err));

        try {
            var uid = JSON.parse(body).uid;
            self._oauth2.getProtectedResource(config.getProfileAPI + '?uid=' + uid, accessToken, function(err, body, res) {
                if (err) return callback(new InternalOAuthError('', err));

                try {
                    callback(null, self.formatProfile(body));
                } catch(e) {
                    callback(e);
                }
            })
        } catch(e) {
            callback(e);
        }
    })
}

Strategy.prototype.formatProfile = function(raw) {
    var user = JSON.parse(raw);
    user.provider = config.name;
    user._raw = raw;
    user._json = JSON.parse(raw);

    // TODO: format object

    return user;
}

module.exports = Strategy;
