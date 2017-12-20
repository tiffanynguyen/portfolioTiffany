/* global angular */
(function () {
    'use strict';

    angular.module('client.crud', ['ui.router', 'client.services'])

    angular.module('client.crud').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            //.state('site.home', {
                //url: '/home',
                // views: {
                //     'content': {
                //         templateUrl: '/client/crud/home/home.html'
                //     }
                // }
                //abstract: true
            //})
            .state('site.create', {
                url: '/create',
                views: {
                    'content': {
                        templateUrl: '/client/crud/home/write/write.html',
                        controller: 'writeController as wCtrl'
                    }
                }
            })
            .state('site.edit', {
                url: '/:id',
                views: {
                    'content': {
                        templateUrl: '/client/crud/home/write/write.html',
                        controller: 'writeController as wCtrl'
                    }
                }
            })
            .state('site.index', {
                url: '/index',
                views: {
                    'content': {
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
