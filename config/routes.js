"use strict";

/**
 * Module dependencies.
 */
var _ = require('underscore');

/**
 *
 * @param app
 * @param express
 */
module.exports = function (app, express) {

    var router = express.Router();

    var roles = require('./roles')(app);

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
    require('../app/routes/index.route')(router);
    require('../app/routes/auth.route')(router);
    require('../app/routes/user.route')(router, roles);


    router.route('/error')
        .get(function (req, res, next) {
            var err = new Error('Error controlado');
            //err.message = 'Mensaje';
            //err.code = '900';
            //err.name = 'ApplicationError';
            //err.status = 405;
            next(err);
        }).post(function (req, res, next) {
            var err = new Error('error por ajax');
            next(err);
        });

    /**
     * Cuando no se encuentra una ruta se envia error 404
     */
    router.use(function (req, res, next) {
        var err = new Error();
        err.status = 404;
        err.message = 'Página no encontrada';
        next(err);
    });


    /**
     * Encapsula las rutas en un único objeto lo que nos permite aislar la funcionalidad
     * Por ejemplo, podemos crear otro objeto router del tipo 'api' (rest) y cambiar su funcionamiento.
     */
    app.use(router);


}