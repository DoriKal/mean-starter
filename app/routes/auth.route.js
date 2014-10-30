var _ = require('underscore');
var passport = require('passport');

/**
 * Todas las rutas para la autenticación de usuarios
 * @param router
 */
module.exports = function (router) {

    /*
     *
     */
    router.route('/signup')
        .get(function (req, res) {
            res.render('signup');
        })
        .post(passport.authenticate('signup', {successRedirect: '/', failureRedirect: '/signup', failureFlash: true}));

    router.route('/auth/signup')
        .get(function (req, res) {
            res.render('signup');
        })
        .post(passport.authenticate('signup', {successRedirect: '/', failureRedirect: '/signup', failureFlash: true}));

    /*
     *
     */
    router.route('/signin')
        .get(function (req, res) {
            if (!_.isUndefined(req.query.err)) {
                if (req.query.err == 401) {
                    res.locals.error = 'Sesion ha caducado, vuelva a iniciar';
                }
            }
            console.log(res.locals);
            res.render('signin');
        })
        .post(passport.authenticate('signin', {successRedirect: '/', failureRedirect: '/signin', failureFlash: true}));

    router.route('/auth/signin')
        .get(function (req, res) {
            res.render('signin');
        })
        .post(passport.authenticate('signin', {successRedirect: '/', failureRedirect: '/signin', failureFlash: true}));

    /*
     *
     */
    router.route('/signout').get(function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.route('/auth/signout').get(function (req, res) {
        req.logout();
        res.redirect('/');
    });

};
