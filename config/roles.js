var ConnectRoles = require('connect-roles');

module.exports = function (app) {
    /**
     * Definimos los roles para las rutas y el error handler
     */
    var roles = new ConnectRoles({
        failureHandler: function (req, res, action) {
            var error = {
                status: 403,
                message: '¡Lo sentimos, pero o puede acceder sin permiso!',
                name: 'ApplicationError',
                stack: (process.env.NODE_ENV === 'development') ? 'role: ' + action : {}

            };
            if (req.xhr) {
                res.status(403).send({error: error})
            } else {
                res.status(403).render('error', {error: error});
            }
        }
    });
    app.use(roles.middleware());


    // controla los acceso publicos como el index, login, y register
    roles.use(function (req, action) {
        console.log('by action: role: ' + action + ' - ' + req.path) ;
        if (action === 'homepage') {
            return true;
        }
        if (!req.isAuthenticated()) {
            return action === 'public access';
        }
    });

    // esto puede ser un control general para acceso privado pero no necesariamente por role de usuario
    roles.use('private access', function (req) {
        console.log('by role: role: private access - ' + req.path);
        //console.log(req.user);
        return true;
    })

    return roles;


};