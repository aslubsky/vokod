define([
    'angular',
    'bz',
    'moment',
    'angular-locale',
    'ui-bootstrap',
    'ngTable',
    'ngTableExport',
    'angular-notify'
], function (angular) {

    var app = angular.module('app', [
        'bz',
        'ui.bootstrap',
        'ngTable',
//        'ngTouch',
        'ngTableExport',
        'cgNotify'
    ]);

    app.config(['$routeSegmentProvider', '$locationProvider', 'bzConfigProvider', '$logProvider', 'bzUserProvider', '$httpProvider',
        function ($routeSegmentProvider, $locationProvider, config, $logProvider, bzUser, $httpProvider) {
            $locationProvider
                .html5Mode(true)
                .hashPrefix('!');

            $routeSegmentProvider.options.autoLoadTemplates = true;
            //$logProvider.debugEnabled(false);
        }]);

    app.run(['$rootScope', '$http', 'bzUser', '$location', '$templateCache', 'notify', '$sce', 'bzConfig',
        function ($rootScope, $http, bzUser, $location, $templateCache, notify, $sce, bzConfig) {

            $rootScope.$on('ajaxError', function () {
                $rootScope.notify(500, 'danger');
            });
            $rootScope.notify = function (msg, type) {
                notify({
                    template: '/themes/default/views/block/angular-notify.html',
                    message: msg == 500 ? 'Ошибка сервера. Пожалуйста, свяжитесь с администратором' : msg,
                    scope: {
                        type: type || 'info'
                    }
                });
            }
        }]);

    return app;

});