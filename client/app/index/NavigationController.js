(function () {
    "use strict";

    angular.module(appName)
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['$preloaded'];

    function NavigationController ($preloaded) {

        var vm = this;

//        vm.title = $preloaded.app.title;
//        vm.user = $preloaded.user;



    }

})();