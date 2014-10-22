(function () {
    "use strict";

    angular.module(appName, ['gs.preloaded', 'ngRoute', 'ngResource']);

    angular.module(appName).config(function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
                templateUrl: 'app/views/index/home.html'
            })
            .when('/users', {
                controller: 'UserController',
                controllerAs: 'userCtrl',
                templateUrl: 'app/views/users/users.html'
            })
            .when('/users/add', {
                controller: 'UserAddController',
                controllerAs: 'userAddCtrl',
                templateUrl: 'app/views/users/add.html'
            })
            .when('/users/show/:username', {
                controller: 'UserShowController',
                controllerAs: 'userShowCtrl',
                templateUrl: 'app/views/users/show.html'
            })
            .when('/users/remove/:username', {
                controller: 'UserRemoveController',
                controllerAs: 'userShowCtrl',
                templateUrl: 'app/views/users/remove.html'
            })
            .when('/users/edit/:username', {
                controller: 'UserEditController',
                controllerAs: 'userEditCtrl',
                templateUrl: 'app/views/users/edit.html'
            })
            .when('/profile/:username', {
                controller: 'ProfileController',
                controllerAs: 'profileCtrl',
                templateUrl: 'app/views/users/profile.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

})()





