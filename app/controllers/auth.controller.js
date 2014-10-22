"use strict";
var passport = require('passport');
var util = require('../helpers/util');
var User = require('../models/user.model');


exports.login = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

exports.signup = passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
});

//exports.signup = function (req, res) {
//    User.findOne({'username': req.body.username}, function (err, user) {
//        if (err) return next(err);
//        if (user) {
//            return next(new Error('User already exists'));
//        }
//        // if there is no user with that email create the user
//        var newUser = new User();
//        newUser.username = req.body.username;
//        newUser.password = util.generateHash(req.body.password);
//        newUser.email = req.body.email;
//        newUser.firstName = req.body.firstName;
//        newUser.lastName = req.body.lastName;
//        // save the user
//        newUser.save(function (err) {
//            if (err) throw err;
//            // inicia sesión automaticamente, si se requiere se puede modificar la funcionalidad, por ejemplo,
//            // para enviar un email y cambiar la contraseña.
//            passport.authenticate('local')(req, res, function () { res.redirect('/'); });
//            //res.status(201);
//        });
//    });
//}
//

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }

    next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
    var _this = this;

    return function(req, res, next) {
        _this.requiresLogin(req, res, function() {
            if (_.intersection(req.user.roles, roles).length) {
                return next();
            } else {
                return res.status(403).send({
                    message: 'User is not authorized'
                });
            }
        });
    };
};