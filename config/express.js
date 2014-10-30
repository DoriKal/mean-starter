"use strict";

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var helmet = require('helmet');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

module.exports = function (app, express) {

    var configApp = app.get('application');

    // view engine setup
    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'jade');

    if (process.env.NODE_ENV === 'development') {
        app.use(logger('dev'));
    }

    if (process.env.NODE_ENV === 'production') {

    }

    if (process.env.NODE_ENV === 'test') {

    }


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    // CookieParser should be above session
    app.use(cookieParser(configApp.secret));

    /*
     * Session Storage
     * Usamos connect-mongo para almacenar las sesiones en mongo, debido a que en producción
     * nunca se debe almacenar en memoria (MemoryStore es por defecto).
     * Por defecto usamos la conexión de mongoose
     * resave y saveUninitialized estan deprecated y deben ser definidas
     */
    app.use(session({
        secret: configApp.secret,
        cookie: {maxAge: configApp.maxAge},
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            mongoose_connection: mongoose.connection
        })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session())

    // connect flash for flash messages
    app.use(flash());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    // Setting the app router and static folder
    app.use(express.static(path.join(__dirname, '../public')));


};