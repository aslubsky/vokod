define(['app'], function (app) {
    app.directive('bzConfirm', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {
                var callback = $parse(attrs.bzConfirm),
                    message = $parse(attrs.message)(scope);
                $(element).click(function () {
                    if (confirm(message)) {
                        callback(scope, {});

                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    }
                })
            }
        };
    }]);

});