/* global angular */
(function () {
    'use strict';

    angular.module('client.crud', ['ui.router', 'client.services'])

    angular.module('client.crud').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('site.home', {
                url: '/home',
                abstract: true
            })
            .state('site.home.create', {
                url: '/create',
                views: {
                    'content@site': {
                        templateUrl: '/client/crud/home/write/write.html',
                        controller: 'writeController as wCtrl'
                    }
                }
            })
            .state('site.home.index', {
                url: '/index',
                views: {
                    'content@site': {
                        templateUrl: '/client/crud/home/index/index.html',
                        controller: 'indexController as iCtrl'
                    }
                }
                ,
                resolve: {
                    contactMessages: getAllContactMessages
                }
            });
    }

    getAllContactMessages.$inject = ['contactMessageService']

    function getAllContactMessages(contactMessageService) {
        return contactMessageService.readAll()
            .then(data => data.items)
    }
})();
