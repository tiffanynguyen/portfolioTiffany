(function () {
    'use strict'

    angular.module('client.services')
        .factory('contactMessageService', ContactMessageServiceFactory)

    ContactMessageServiceFactory.$inject = ['$http', '$q']

    function ContactMessageServiceFactory($http, $q) {
        return {
            readAll: readAll,
            readById: readById,
            create: create,
            update: update,
            delete: _delete
        }

        function readAll() {
            return $http.get('/api/contactMessages')
                .then(xhrSuccess)
                .catch(onError)
        }

        function readById(id) {
            return $http.get(`/api/contactMessages/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function create(contactMessageData) {
            return $http.post('/api/contactMessages', contactMessageData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(contactMessageData) {
            return $http.put(`/api/contactMessages/${contactMessageData._id}`, contactMessageData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/contactMessages/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            console.log(error.data)
            return $q.reject(error.data)
        }
    }
})()
