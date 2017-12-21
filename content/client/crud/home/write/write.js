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
            if ($state.params.id) {
                contactMessageService.readById($state.params.id)
                    .then(data => vm.formData = data.item)
            }
        }

        function _submit(){
            contactMessageService.update(vm.formData)
            .then(data => {
                console.log(data)
                $state.go('site.index', null, {reload:true})
            })
        }


    }
})();