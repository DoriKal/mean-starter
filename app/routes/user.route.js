"use strict";

var auth = require('../../config/authorization');
var user = require('../controllers/user.controller');

module.exports = function(router, roles) {

    router.route('/users')
        .get(auth.requiresLogin, roles.can('private access'), user.findAll)
        .post(auth.requiresLogin, roles.can('private access'), user.create);

    router.route('/users/:username')
        .get(auth.requiresLogin, roles.can('private access'), user.findByUsername)
        .put(auth.requiresLogin, roles.can('private access'), user.modify)
        .delete(auth.requiresLogin, roles.can('private access'), user.remove);

};

