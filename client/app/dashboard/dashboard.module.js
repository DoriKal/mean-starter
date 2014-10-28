(function () {
    'use strict';

    angular.module('app.dashboard', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'DashboardController',
                    controllerAs: 'dashboardCtrl',
                    templateUrl: 'app/dashboard/views/index.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });

})();