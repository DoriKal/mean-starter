var util = require('../helpers/util');
var User = require('../models/user.model');

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.create = function (req, res, next) {

    User.findByUsername(req.body.username, function (err, user) {
        if (err) return next(err);
        if (user) {
            return next(new Error('Usuario ya existe'));
        }
        // if there is no user with that email create the user
        var newUser = new User();
        newUser.username = req.body.username;
        newUser.password = util.generateHash(req.body.password);
        newUser.email = req.body.email;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        // save the user
        newUser.save(function (err) {
            if (err) return next(err);
            res.status(201).end();
        });
    });
};

exports.modify = function (req, res, next) {
    //User.update({username: req.params.username}, req.body, function (err) {
    //    if (err) return next(err);
    //    res.status(200).end();
    //});
    console.log(req.body);
    User.findByUsername(req.param('username'), function (err, user) {
        if (err) return next(err);
        if (!user) {
            return next(new Error('User not found'));
        }

        user.email = req.body.email;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.roles = req.body.roles;
        user.save(function (err) {
            if (err) return next(err);
            res.status(200).end();
        })
    });
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.remove = function (req, res, next) {
    User.findByUsername(req.param('username'), function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Usuario no encontrado'));
        user.remove(function (err) {
            if (err) return next(err);
            res.status(200).end();
        })
    });
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.findByUsername = function (req, res, next) {
    User.findByUsername(req.param('username'), function (err, user) {
        if (err) return next(err);
        if (!user) {
            return next(new Error('User not found'));
        }
        res.status(200).send(user);
    });
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.findAll = function (req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.status(200).send(users);
    });
};



