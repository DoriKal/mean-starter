(function () {
    'use strict';

    angular.module(appName)
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory'];

    /* @ngInject */
    function UserController(UserFactory) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Usuario';

        vm.users = UserFactory.apiData().query();

        activate();

        ////////////////

        function activate() {
        }
    }
})();