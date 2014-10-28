(function () {
    'use strict';

    angular.module('app.user')
        .factory('User', UserFactory);

    UserFactory.$inject = ['$resource'];

    /* @ngInject */
    function UserFactory($resource) {

        return $resource('/users/:username',
            {
                username: '@username'
            },
            {
                update: {method: 'PUT'}
            });

    }
})();