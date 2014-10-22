var express = require('express');
var debug = require('debug')('mean-starter');

debug('booting %s', 'mean-starter');

var app = express();

/**
 * Environment
 */
require('./config/environment')(app);
debug('environment loaded.');

/**
 * MongoDB
 */
require('./config/mongodb')(app);
debug('mongodb loaded.');

/**
 * Express Middleware
 */
require('./config/express')(app, express);
debug('middleware loaded.');

/**
 * Passport (Authentication)
 */
require('./config/passport')(app);
debug('passport loaded.');

/**
 * Routes
 */
require('./config/routes')(app, express);
debug('routes loaded.');

/**
 * Error Handler
 */
require('./config/errorhandler')(app);
debug('Error handler loaded.');


var server = app.listen(process.env.PORT, function() {
    debug('Express server listening on port ' + server.address().port);
    console.log('Express Server listening on port ' + process.env.PORT + ' for ' + process.env.NODE_ENV.toUpperCase());
});

//module.exports = app;
