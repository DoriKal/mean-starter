(function () {
    'use strict';

    angular.module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$resource'];

    /* @ngInject */
    function dataservice($resource) {
        var service = {
            getUser: getUser
        };

        return service;

        ////////////////

        function getUser() {
            return $resource('/users/:username', {id: '@id'}, {
                    update: { method: 'PUT'}
                }
            );
        }
    }
})();