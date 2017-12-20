(function () {
    'use strict'
    angular.module('client.crud')
        .controller('writeController', WriteController)

    WriteController.$inject = ['$state', 'contactMessageService']
    function WriteController($state, contactMessageService) {
        var vm = this
        vm.formData = null
        vm.submit = _submit
        init()

        function init() {
        }

        function _submit(){
            contactMessageService.create(vm.formData)
            .then(data => console.log(data))
        }

    }
})();