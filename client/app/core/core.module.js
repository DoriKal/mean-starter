(function () {
    'use strict';

    angular.module('app.core', ['ngResource', 'ngNotify'])
        .constant('toastr', toastr);

        //.config(function ($httpProvider) {
        //    $httpProvider.interceptors.push('AuthInterceptor');
        //})
        //.factory('AuthInterceptor', ['$q', '$window', function ($q, $window) {
        //    return  {
        //
        //        responseError: function (response) {
        //            console.log(response.status);
        //            if (response.status === 401) {
        //                $window.location.href = '/signin';
        //            }
        //            return $q.reject(response);
        //        }
        //    }
        //}]);

})();