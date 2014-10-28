(function () {
    'use strict';

    angular.module('app.user')
        .controller('UsersController', UsersController);
        //.controller('UserController', UserController);

    UsersController.$inject = ['dataservice'];

    UserController.$inject = ['dataservice', '$routeParams'];


    /* @ngInject */
    function UsersController(dataservice)
    {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Users';
        vm.users = [];
        vm.user = {};

        // Funciones
        vm.create = create;

        activate();

        ////////////////

        function activate() {
            return findAll();
        }

        function findAll() {
            dataservice.getUser().query(function (users) {
                vm.users = users;
            });
        }

        function create() {

            console.log(vm.user);
            var User = new dataservice.getUser();
            User.save(vm.user, function (val) {
                console.log(val);
                console.log('a ver si lo crea');
            });


        }

    }


    /* @ngInject */
    function UserController(dataservice, $routeParams)
    {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'User';

        activate();

        ////////////////

        function activate() {
        }
    }

})();