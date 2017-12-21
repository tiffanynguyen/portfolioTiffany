(function () {
    'use strict'
    angular.module('contact', ['client.services'])
        .controller('writeController', WriteController)

    WriteController.$inject = ['contactMessageService']
    function WriteController(contactMessageService) {
        var vm = this
        vm.formData = null
        vm.submit = _submit
        init()

        function init() {
        }

        function _submit() {
            contactMessageService.create(vm.formData)
                .then(data => vm.formData = null)
        }

    }
})();

(function () {
    angular.module('client.services', [])
})();