(function () {
    'use strict';

    angular.module('app.user', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/users', {
                    templateUrl:'app/views/users/users.html'
                })
                .when('/users/add', {
                    templateUrl: 'app/views/users/add.html'
                })
                .when('/users/show/:username', {
                    templateUrl: 'app/views/users/show.html'
                })
                .when('/users/remove/:username', {
                    templateUrl: 'app/views/users/remove.html'
                })
                .when('/users/edit/:username', {
                    templateUrl: 'app/views/users/edit.html'
                })
                .when('/profile/:username', {
                    templateUrl: 'app/views/users/profile.html'
                });
        });
})();