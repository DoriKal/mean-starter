(function () {
    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardController', DashboardController);

    //HomeController.$inject = ['$scope'];

    /* @ngInject */
    function DashboardController() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Panel de Control';

        activate();

        ////////////////

        function activate() {
        }
    }
})();