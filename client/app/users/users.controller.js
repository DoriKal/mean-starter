(function () {
    'use strict';

    angular.module('app.user')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['dataservice', '$routeParams'];

    /* @ngInject */
    function UsersController(dataservice, $routeParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;

        vm.title = 'Usuarios';

        vm.users = [];
        vm.user = {};

        vm.userSelected = '';

        vm.message = '';
        vm.messageModal = '';

        vm.selectUser = selectUser;
        vm.isUserSelected = isUserSelected;
        vm.create = create;
        vm.readAll = readAll;
        vm.update = update;
        vm.remove = remove;

        activate();



        ////////////////

        function activate() {
            vm.readAll();
        }

        function selectUser(id) {
            vm.userSelected = id;
            vm.user = dataservice.getUser().get({username:id});
        }

        function isUserSelected(id) {
            return vm.userSelected === id;
        }

        function create() {
            console.log(vm.user);
            var User = dataservice.getUser();
            User.save(vm.user, function () {
                console.log('success');
                vm.user = {};
                vm.readAll();
                vm.message = {
                    type:'success',
                    text:'Usuario creado con exoto'
                };
                closeModal();
            }, function () {
                vm.messageModal = 'No se pudo crear el usuario, revise los datos.';
            });

        }

        function readAll() {
            vm.users = dataservice.getUser().query();
        }

        function update() {
            var User = dataservice.getUser();
            User.update({username:vm.userSelected}, vm.user,  function () {
                console.log('update success');
                vm.user = {};
                vm.readAll();
                vm.message = {
                    type:'success',
                    text:'Usuario actualizado con éxito'
                };
                closeModal();
            }, function () {
                console.log('update error');
                vm.messageModal = 'No se pudo actualizar el usuario, revise los datos.';
            });
        }

        function remove() {
            var User = dataservice.getUser();
            User.remove({username:vm.userSelected}, function () {
                console.log('remove success');
                vm.readAll();
                vm.selectUser();
                closeModal();
            }, function () {
                console.log('remove error');
                vm.messageModal = 'No se pudo eliminar el usuario, revise los datos.';
            });
        }


        function closeModal() {
            $('.modal').modal('hide');
        }

    }


})();