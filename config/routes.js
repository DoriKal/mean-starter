"use strict";

/**
 * Module dependencies.
 */
var _ = require('underscore');
var passport = require('passport');
var ConnectRoles = require('connect-roles');


/**
 *
 * @param app
 * @param express
 */
module.exports = function (app, express) {

    var router = express.Router();

    /**
     * Definimos los roles para las rutas
     */
    var roles = new ConnectRoles({
        failureHandler : function (req, res, action) {

            console.log(req.headers);
            if (req.xhr) {
                res.send(403);
            } else {
                res.render('errors/403', {action: action});
            }

        }
    });
    app.use(roles.middleware());



    // controla los acceso publicos como el index, login, y register
    roles.use(function (req, action) {
//        console.log(req.path);
        console.log('role: ' + action);
        if (action === 'homepage') {
            return true;
        }
        if (!req.isAuthenticated()) {
            return action === 'public access';
        }
    });

    // esto puede ser un contro general para acceso privado pero no necesariamente por role de usuario
    roles.use('private access', function (req) {
        console.log('role: private access');
        console.log(req.user);
        return true;
    })


    /**
     * Carga los valores en el res.locals
     */
    router.use(function (req, res, next) {
        res.locals.user = req.user;
        res.locals.isAuthenticated = req.isAuthenticated();
        res.locals.error = req.flash('error');
        next();
    })


    /**
     * Define las rutas para cada modulo de la aplicación
     * Este modo de implementación mejora la lectura del código y facilita el activar/desactivar cada módulo
     */
    require('../app/routes/index.route')(router, passport, roles);
    require('../app/routes/auth.route')(router, passport, roles);
    require('../app/routes/user.route')(router, passport, roles);

    /**
     * Encapsula las rutas en un único objeto lo que nos permite aislar la funcionalidad
     * Por ejemplo, podemos crear otro objeto router del tipo 'api' (rest) y cambiar su funcionamiento.
     */
    app.use(router);


}