var util = require('../helpers/util');
var User = require('../models/user.model');

exports.create = function (req, res, next) {
    User.findOne({'username': req.body.username}, function (err, user) {
        if (err) return next(err);
        if (user) {
            return next(new Error('User already exists'));
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
            if (err) throw err;
            res.status(201);
        });
    });
};

exports.modify = function (req, res) {
    User.findOne({'username': req.param('username')}, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return next(new Error('User not found'));
        }
        res.status(200).send(user);
    });
};

exports.remove = function (req, res) {
    User.findOne({'username': req.param('username')}, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return next(new Error('User not found'));
        }
        res.status(200).send(user);
    });
};

exports.findByUsername = function (req, res, next) {
    User.findOne({'username': req.param('username')}, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return next(new Error('User not found'));
        }
        res.status(200).send(user);
    });
};

exports.findAll = function (req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.status(200).send(users);
    });
};
