var index = require('../controllers/index.controller');
var auth = require('../controllers/auth.controller');

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('home', { user: req.user });
    } else {
        res.redirect('/');
    }

}

module.exports = function (router, passport, roles) {

    router.route('/')
        .get(roles.can('homepage'), index.index);

    router.route('/signup')
        .get(roles.can('public access'), index.signup)
        .post(roles.can('public access'), auth.signup);

    router.route('/login')
        .get(roles.can('public access'), index.login)
        .post(roles.can('public access'), auth.login);

    router.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });
}


