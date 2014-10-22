(function () {
    'use strict';

    angular.module(appName)
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$resource'];

    /* @ngInject */
    function UserFactory($resource) {

        var service = {
            apiData: apiData
        };

        return service;

        ////////////////////

        function apiData() {
            return $resource('/users/:username', {username: '@username'}, {update: {method: 'PUT'}});
        }

    }
})();