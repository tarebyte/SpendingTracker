var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('users', { title: 'Sample User'});
});

router.get('/:id', function(req, res, next) {
  //User id request matches logged in user id
  if (req.session.passport && req.session.passport.user) {
    console.log('url: ' + req.url + '  User id: ' + req.session.passport.user.id);
    if (userMatchesURLReq(req.url, req.session.passport.user.id)) {
      res.render('user', { user: req.user });
    } else {
      res.send('Don\'t try to access another user\'s information!');
    }

  } else {

    res.redirect('/login');

  }
});

var userMatchesURLReq = function(reqURL, userId) {
  return reqURL == ('/' + userId);
}

module.exports = router;
