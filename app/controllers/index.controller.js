"use strict";

exports.index = function (req, res) {
    var view = (req.isAuthenticated())?'indexng':'index';
    res.render(view);
};

exports.signup = function (req, res) {
    res.render('signup');
}

exports.login = function (req, res) {
    res.render('login');
}