define(['app'], function (app) {

    app.directive('dropdownMenu', [function () {
        return {
            restrict: 'C',
            link: function (scope, element, attr) {
                element.find('*').on('click', function (e) {
                    e.stopPropagation();
                });
            }
        };
    }]);

});