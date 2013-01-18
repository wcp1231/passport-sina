exports.index = function(req, res) {
  var data = { 'is_auth' : req.isAuthenticated() }
  if (data.is_auth) {
    data['title'] = '欢迎您，' + req.user.screen_name;
    data['user_data'] = JSON.stringify(req.user, undefined, '\t');
  } else {
    data['title'] = '请登陆';
  }
  res.render('index', data)
}
exports.login = function(req, res){
  res.redirect('/auth/sina');
};
exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
}