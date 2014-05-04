define([
    'app'
], function (app) {

    app.factory('categoriesFactory', ['$resource', 'bzConfig',
        function ($resource, bzConfig) {
            var CategoriesResource = $resource(bzConfig.resource('/categories/:id'), {'id': '@id'}, {
                'save': { method: 'PUT' },
                'create': { method: 'POST'},
                '$delete': { method: 'DELETE'}
            });
            return CategoriesResource;
        }]);

});