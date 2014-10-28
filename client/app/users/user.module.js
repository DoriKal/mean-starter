(function () {
    'use strict';

    angular.module('app.user', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/users', {
                    controller:'UsersController',
                    controllerAs:'usersCtrl',
                    templateUrl:'app/users/views/index.html'
                })
                .when('/users/add', {
                    templateUrl: 'app/users/views/add.html'
                })
                .when('/users/:username', {
                    templateUrl: 'app/users/views/show.html'
                })
                .when('/users/:username/remove', {
                    templateUrl: 'app/users/views/remove.html'
                })
                .when('/users/:username/edit', {
                    templateUrl: 'app/users/views/edit.html'
                })
                .when('/profile/:username', {
                    templateUrl: 'app/users/views/profile.html'
                });
        })

})();