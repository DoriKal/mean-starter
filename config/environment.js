var _ = require('underscore');

module.exports = function (app) {

    // define el environment por defecto
    var envs = ['development', 'production', 'test'];
    if (!_.contains(envs, process.env.NODE_ENV)) {
        console.log("Environment %s no encontrado, se usa 'development' por defecto.", process.env.NODE_ENV);
        process.env.NODE_ENV = 'development';
    }

    // cargamos el environment de la app
    var environment = _.extend({}, require('./env/all'), require('./env/' + process.env.NODE_ENV));

    // cargamos el puerto por defecto
    process.env.PORT = process.env.PORT || environment.application.port || 3000;

    // cargamos en la app la configuración para cada modulo
    app.set('application', environment.application);
    app.set('mongodb', environment.mongodb);
    app.set('aws', environment.aws);
    app.set('port', process.env.PORT);
    app.set('environment', environment);

    // variables globales
    app.locals.name = environment.application.name;
    app.locals.title = environment.application.title;
    app.locals.description = environment.application.description;
    app.locals.keywords = environment.application.keywords;


}
