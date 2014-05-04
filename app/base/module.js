define([
    'app',
    'base/controllers/MainCtrl',
    'base/controllers/DoctorsCtrl',
    'base/controllers/CategoriesCtrl',
    'base/factories/doctorsFactory',
    'base/factories/journalsFactory',
    'base/factories/categoriesFactory',
    'base/directives/bzConfirm',
    'base/directives/bzDatepicker'
    /*'base/directives/dropdownMenu',
     'base/directives/bzDatepicker',
     'base/filters/translate',

     'base/interceptors/ajaxStatusInterceptor'*/
], function (app) {

    app.config(['$routeSegmentProvider', 'bzConfigProvider',
        function ($routeSegmentProvider, config) {

            $routeSegmentProvider
                .when('/', 'main')
                .segment('main', {
                    templateUrl: '/themes/default/views/main.html',
                    resolve: {
                    },
                    controller: 'Dashboard.MainCtrl',
                    resolveFailed: config.errorResolver()
                });

            $routeSegmentProvider
                .when('/doctors', 'doctors')
                .segment('doctors', {
                    templateUrl: '/themes/default/views/doctors.html',
                    resolve: {
                    },
                    controller: 'Dashboard.DoctorsCtrl',
                    resolveFailed: config.errorResolver()
                });

            $routeSegmentProvider
                .when('/categories', 'categories')
                .segment('categories', {
                    templateUrl: '/themes/default/views/categories.html',
                    resolve: {
                    },
                    controller: 'Dashboard.CategoriesCtrl',
                    resolveFailed: config.errorResolver()
                });

        }]);

});