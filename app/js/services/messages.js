'use strict';

/**
 * @ngdoc service
 * @name sjantiApp.Messages
 * @description
 * # Messages
 * Service in the sjantiApp.
 */
angular.module('dataDash')
    .service('msgService', function ($http) {

        var apiBase = '/api/',
            MessagesService = {};

        MessagesService.getMessages = function (page, size) {
            var params = {
                page: page,
                size: size
            };
            var config = {
                params: params
            };
            return $http.get(apiBase + 'messages', config)
        };

        return MessagesService;
    });