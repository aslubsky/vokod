define(['app', 'bootstrap-datepicker.ru'], function (app) {
    app.directive('bzDatepicker', function () {
        return {
            restrict: 'A',
            scope: false,
            require: '?ngModel',
            link: function (scope, element, attrs, controller) {
                var picker = $(element).parent().click(function (e) {
                    e.preventDefault();
                }).datepicker({
                        autoclose: true,
                        language: 'ru'
                    });

                if (controller) {
                    picker.on('changeDate', function (ev) {
                        scope.$apply(function () {
                            controller.$setViewValue(element.val());
                        });
                    });
                }
            }
        };
    });
});