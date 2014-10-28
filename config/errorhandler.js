module.exports = function (app) {


    /**
     * intercepta cualquier error para su procesamiento
     */
    app.use(function (err, req, res, next) {
        // muestra por consola cualquier error producido
        if ('ValidationError' === err.name) {
            err.status = 400;
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

    /**
     * Envía el error dependiendo del tipo de petición
     */
    app.use(function (err, req, res, next) {
        //var error = (process.env.NODE_ENV === 'development') ? err : {};
        // Si la petición es ajax
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
                res.render('error', {error: error});
            },
            json: function () {
                console.log('by ajax: ' + req.path);
                res.status(err.status).send({error: error})
            }
        });

        //if (req.xhr) {
        //    console.log('by ajax: ' + req.path);
        //    res.status(err.status).send({error: error})
        //} else {
        //    console.log('by normal: ' + req.path);
        //    res.render('error', {error: error});
        //}
    });


};