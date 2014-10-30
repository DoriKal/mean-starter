'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {

    // si ya esta autenticado continua
    if (req.isAuthenticated()) {
        return next();
    }

    var error = {
        status: 401,
        message: 'No tiene autorización!',
        name: 'ApplicationError',
        stack: (process.env.NODE_ENV === 'development') ? 'isAuthenticated: ' + req.isAuthenticated() : {}
    };
    res.format({
        html: function () {
            res.status(401).render('error', {error: error});
        },
        json: function () {
            res.status(401).send({error: error});
        }
    });
};

/**
 * Generic require Admin routing middleware
 * Basic Role checking - future release with full permission system
 */
//exports.requiresAdmin = function (req, res, next) {
//    if (!req.isAuthenticated() || !req.user.hasRole('admin')) {
//        return res.send(401, 'User is not authorized');
//    }
//    next();
//};


/**
 * User authorizations routing middleware
 */
//exports.hasAuthorization = function(roles) {
//    var _this = this;
//
//    return function(req, res, next) {
//        _this.requiresLogin(req, res, function() {
//            if (_.intersection(req.user.roles, roles).length) {
//                return next();
//            } else {
//                return res.status(403).send({
//                    message: 'User is not authorized'
//                });
//            }
//        });
//    };
//};