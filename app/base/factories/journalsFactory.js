define([
    'app'
], function (app) {

    app.factory('journalsFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var JournalsResource = $resource(bzConfig.resource('/journals/'), {}, {
                'save': { method: 'PUT' }
            });
            return JournalsResource;
        }]);

});