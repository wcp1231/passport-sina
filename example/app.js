var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , sinaStrategy = require('./config');

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

passport.use(sinaStrategy);

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// routes
app.get('/',                    routes.index);
app.get('/user',                routes.user.index);
app.get('/user/login',          routes.user.login);
app.get('/user/logout',         routes.user.logout);
app.get('/auth/sina',           routes.auth.before.index,       routes.auth.index);
app.get('/auth/sina/callback',  routes.auth.before.callback,    routes.auth.callback);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
