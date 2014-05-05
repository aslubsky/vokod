define([
    'app'
], function (app) {

    app.factory('journalsFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var JournalsResource = $resource(bzConfig.resource('/journals/'), {}, {
                'save': { method: 'PUT' },
                'getReport': { method: 'GET', params: {action: 'getReport'} }
            });
            return JournalsResource;
        }]);

});