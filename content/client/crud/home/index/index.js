(function () {
    'use strict'
    angular.module('client.crud')
        .controller('indexController', IndexController)

    IndexController.$inject = ['contactMessages', '$log', 'contactMessageService', '$state']
    function IndexController(contactMessages, $log, contactMessageService, $state) {
        var vm = this
        vm.displayMessages = null
        //vm.edit = _edit
        vm.delete = _delete
        //vm.detail = _detail

        init()

        function init() {
            vm.displayMessages = contactMessages
            $log.log(vm.displayMessages)
        }

        function _delete(id) {
            $log.log(id)
            contactMessageService.delete(id)
                .then(data => {
                    $log.log(data)
                    $state.reload()
                })
                .catch(err => $log.log(err))
        }

    }
})();