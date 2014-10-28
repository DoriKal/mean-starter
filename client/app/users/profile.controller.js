(function () {
    'use strict';

    angular.module(appName)
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['UserFactory', '$routeParams'];

    /* @ngInject */
    function ProfileController(UserFactory, $routeParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Profile';

        //vm.user = UserFactory.apiData().get({username:$routeParams.username});

        activate();

        ////////////////

        function activate() {
        }




    }
})();