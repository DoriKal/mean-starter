(function () {
    'use strict';

    angular.module('app.user')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['dataservice', 'ngNotify'];

    /* @ngInject */
    function UsersController(dataservice, ngNotify) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;

        vm.title = 'Usuarios';

        vm.users = [];
        vm.user = {};

        vm.userSelected = undefined;

        vm.action = undefined;

        vm.createUser = createUser;
        vm.selectUser = selectUser;
        vm.isUserSelected = isUserSelected;

        vm.save = save
        vm.create = create;
        vm.readAll = readAll;
        vm.update = update;
        vm.remove = remove;
        vm.cancel = cancel;

        activate();


        ////////////////

        function activate() {
            vm.readAll();
        }

        function createUser() {
            vm.action = 'new';
            vm.userSelected = undefined;
            vm.user = {};
        }

        function selectUser(id) {
            vm.action = 'show';
            vm.userSelected = id;
            vm.user = dataservice.getUser().get({username: id});
        }

        function isUserSelected(id) {
            return vm.userSelected === id;
        }

        function save() {
            if (vm.action === 'new') {
                vm.create();
            } else if (vm.action === 'edit') {
                vm.update();
            }
        }


        function readAll() {
            vm.users = dataservice.getUser().query();
        }

        function create() {
            var User = dataservice.getUser();
            User.save(vm.user, function () {
                vm.user = {};
                vm.readAll();
                vm.action = undefined;
                ngNotify.set('Usuario creado exitosamente', 'success');
            }, function (res) {
                ngNotify.set(res.data.error.message, 'error');
            });

        }

        function update() {
            var User = dataservice.getUser();
            User.update({username: vm.userSelected}, vm.user, function () {
                vm.user = {};
                vm.readAll();
                ngNotify.set('Usuario actualizado exitosamente', 'success');
            }, function (res) {
                console.log(res);
                ngNotify.set(res.data.error.message, 'error');
            });
        }

        function remove() {
            var User = dataservice.getUser();
            User.remove({username: vm.userSelected}, function () {
                vm.readAll();
                vm.selectUser();
                vm.action = undefined;
                ngNotify.set('Usuario eliminado correctamente', 'success');
            }, function (res) {
                console.log(res);
                ngNotify.set(res.data.error.message, 'error');
            });
        }

        function cancel() {
            switch (vm.action) {
                case 'new':
                case 'show':
                    vm.action = undefined;
                    vm.userSelected = undefined;
                    vm.user = {};
                    break;
                case 'edit':
                case 'remove':
                    vm.action = 'show';
                    break;

            }
        }


    }


})();