(function () {
    "use strict";

    angular.module('app.core')
        .config(toastrConfig)
        .config(authConfig);


    /*
     * Toastr Configuration, para el manejo de notificaciones
     */
    toastrConfig.$inject = ['toastr'];

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 5000;
        toastr.options.positionClass = 'toast-top-right';
    }


    /*
     * Auth Configuration, manejo de la autenticación y autorización
     */

    authConfig.$inject = ['$httpProvider'];
    /* @ngInject */
    function authConfig($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $window) {
            return {
                responseError: function (response) {
                    console.log('Interceptor responseError:');
                    console.log(response);
                    if (response.status === 401) {
                        $window.location.href = '/signin?err=401';
                    }
                    return $q.reject(response);
                }
            }
        });
    }

    /*
     * ngNotify
     */
    ngNotifyConfig.$inject = ['ngNotify']
    function ngNotifyConfig(ngNotify) {

    }


})();