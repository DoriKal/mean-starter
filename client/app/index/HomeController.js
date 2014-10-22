(function () {
    'use strict';

    angular.module(appName)
        .controller('HomeController', HomeController);

    //HomeController.$inject = ['$scope'];

    /* @ngInject */
    function HomeController() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'HomeController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();