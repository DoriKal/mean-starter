/**
 * Route para el index, no se implementa un controller
 * @param router
 */
module.exports = function (router) {

    /*
     * Index de la aplicación, si esta autenticado carga el index de angular
     */
    router.route('/').get(function (req, res) {
        var view = (req.isAuthenticated()) ? 'indexng' : 'index';
        res.render(view);
    });
}
