/**
 *
 * @param app
 */
module.exports = function (app) {

    /*
     * intercepta cualquier error para su procesamiento
     */
    app.use(function (err, req, res, next) {
        // muestra por consola cualquier error producido
        console.log(err);
        if ('ValidationError' === err.name) {
            err.status = 400;
            // TODO: recorrer el objeto err.errors y de cada propiedad encontrada obtener el message

        } else if ('MongoError' === err.name) {
            err.status = 400;
        } else if ('SyntaxError' === err.name) {
            err.message += ' - Revisar JSON o XML';
            err.status = 400;
        } else {
            err.name = 'ApplicationError';
            err.status = err.status || 500;
        }
        console.error("Error found: %s, %s, %s", err.status, err.name, err.message);
        next(err);
    });

    /*
     * Envía el error dependiendo del tipo de petición
     */
    app.use(function (err, req, res, next) {

        var error = {
            status: err.status,
            name: err.name,
            message: err.message,
            stack: (process.env.NODE_ENV === 'development') ? err.stack : {}

        };

        // evalua el valor de header.accept y header.content-type determina el formato de respuesta
        res.format({
            html: function () {
                console.log('by normal: ' + req.path);
                res.status(err.status).render('error', {error: error});
            },
            json: function () {
                console.log('by ajax: ' + req.path);
                res.status(err.status).send({error: error})
            }
        });

    });


};