define([
    'app'
], function (app) {

    app.factory('doctorsFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var DoctorsResource = $resource(bzConfig.resource('/doctors/:id'), {'id': '@id'}, {
                'save': { method: 'PUT' },
                'create': { method: 'POST'},
                '$delete': { method: 'DELETE'}
            });
            return DoctorsResource;
        }]);

});