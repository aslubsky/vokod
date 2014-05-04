define([
    'angular',
    'app'
], function (angular, app) {
    'use strict';

    app.factory('ajaxStatusInterceptor', ['$rootScope', '$q', function ($rootScope, $q) {
        return {
            // On response failture
            responseError: function (rejection) {
//                console.log(rejection);
                if (rejection.status == 500) {
                    $rootScope.$emit('ajaxError');
                }
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('ajaxStatusInterceptor');
    }]);

});