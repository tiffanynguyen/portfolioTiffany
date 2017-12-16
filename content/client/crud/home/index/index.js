(function () {
    'use strict'
    angular.module('client.crud')
        .controller('indexController', IndexController)

    IndexController.$inject = ['contactMessages']
    function IndexController(contactMessages) {
        var vm = this
        vm.displayMessages = null
        init()

        function init() {
            vm.displayMessages = contactMessages
            console.log(vm.displayMessages)
        }

    }
})();