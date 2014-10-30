"use strict";

var auth = require('../../config/authorization');
var user = require('../controllers/user.controller');

module.exports = function(router) {

    router.route('/users')
        .get(auth.requiresLogin, user.findAll)
        .post(auth.requiresLogin, user.create);

    router.route('/users/:username')
        .get(auth.requiresLogin, user.findByUsername)
        .put(auth.requiresLogin, user.modify)
        .delete(auth.requiresLogin, user.remove);

};

