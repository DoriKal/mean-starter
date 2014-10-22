"use strict";

var user = require('../controllers/user.controller');

module.exports = function(router, passport, roles) {

    router.route('/users')
        .get(roles.can('private access'), user.findAll)
        .post(roles.can('private access'), user.create);

    router.route('/users/:username')
        .get(roles.can('private access'), user.findByUsername)
        .put(roles.can('private access'), user.modify)
        .delete(roles.can('private access'), user.remove);

};

