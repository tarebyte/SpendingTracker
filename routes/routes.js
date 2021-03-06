var express = require('express');
var router = express.Router();
var passport = require('passport');

router.setup = function(app, handlers) {
  app.get('/', handlers.staticPages.getHome);
	app.get('/401', handlers.staticPages.get401);
	app.get('/about', handlers.staticPages.getAbout);
	app.get('/users', handlers.user.getSampleUser);
	app.get('/users/login', handlers.user.getLogin);
	app.get('/users/logout', handlers.user.getLogout);
	app.get('/users/signup', handlers.user.getSignup);
	app.get('/users/:id', handlers.user.getUser);
	app.post('/users/signup', handlers.user.createUser);
	app.post('/users/login', passport.authenticate('local', {failureRedirect: '/401'}), handlers.user.postLogin);
	app.post('/users/:id', handlers.user.postUser);
}

module.exports = router;