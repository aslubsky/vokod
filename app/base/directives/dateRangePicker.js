define(['app', 'bootstrap-daterangepicker'], function (app) {

    app.directive('dateRangePicker', function () {
        return {
            require: 'ngModel',
            link: function ($scope, $element, $attributes, ngModel) {

                var options = {};
                options.format = $attributes.format || 'YYYY-MM-DD';
                options.separator = $attributes.separator || ' - ';
                options.minDate = $attributes.minDate && moment($attributes.minDate);
                options.maxDate = $attributes.maxDate && moment($attributes.maxDate);
                options.dateLimit = $attributes.limit && moment.duration.apply(this, $attributes.limit.split(' ').map(function (elem, index) {
                    return index === 0 && parseInt(elem, 10) || elem;
                }));

                options.locale = {
                    applyLabel: 'Применить',
                    cancelLabel: 'Отмена',
                    fromLabel: 'От',
                    toLabel: 'До',
                    weekLabel: 'Н',
                    customRangeLabel: 'Свой диапазон',
                    daysOfWeek: moment()._lang._weekdaysMin.slice(),
                    monthNames: 'янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек'.split('_'),
                    firstDay: 1
                };

                ngModel.$formatters.unshift(function (modelValue) {
                    if (!modelValue) return '';
                    return modelValue;
                });

                ngModel.$parsers.unshift(function (viewValue) {
                    return [viewValue[0].split('T')[0], viewValue[1].split('T')[0]];
                });

                ngModel.$render = function () {
                    if (!ngModel.$viewValue || !ngModel.$viewValue.startDate) return;
//                    $element.val(formatted(ngModel.$viewValue));
                };


                $($element).daterangepicker(options, function (start, end) {
                    $scope.$apply(function () {
                        ngModel.$setViewValue([start.format(), end.format()]);
                        ngModel.$render();
                    });
                });
            }
        };
    });
});
