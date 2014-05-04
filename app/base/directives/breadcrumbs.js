define(['app'], function (app) {

    app.directive('breadcrumbs', ['$parse', '$compile', '$interpolate', function ($parse, $compile, $interpolate) {
        var template = '<ol class="breadcrumb">' +
                '<li ng-class="{active:item.active}" ng-repeat="item in breadcrumbs">' +
                '    <a ng-if="item.href" title="{{item.title}}" ng-href="{{item.href}}">{{item.short_title}}</a>' +
                '    <span title="{{item.title}}" ng-if="!item.href">{{item.short_title}}</span>' +
                '</li>' +
                '</ol>',
            breadcrumbs = [],
            element = null;
        return {
            restrict: 'AE',
            scope: false,
            replace: true,
            controller: function ($scope) {
                this.addBreadcrumb = function (item) {
                    breadcrumbs.push(item);
                    return item;
                }
                this.changed = function () {
                    $scope.breadcrumbs = breadcrumbs;
                    if (element) {
                        var el = angular.element(template);
                        element.replaceWith(el);
                        element = el;
                        $compile(element)($scope);
                    }
                }
            },
            compile: function () {
                return {
                    pre: function () {
                        breadcrumbs = [];
                    },
                    post: function ($scope, el, attributes) {
                        if (el.context.nodeName != "BREADCRUMBS") {
                            element = el;
                        } else {
                        }
                    }
                }
            }
        };
    }]);

    app.directive('crumb', ['$parse', '$compile', '$interpolate', function ($parse, $compile, $interpolate) {
        return {
            restrict: 'E',
            scope: {
                'title': '=',
                'href': '='
            },
            require: '^breadcrumbs',
            transclude: true,
            link: function ($scope, element, attributes, breadcrumbs) {
                var truncate = function (str, len) {
                    if (str.length > len) {
                        return str.substring(0, len) + '...';
                    }
                    return str;
                };
                var breadcrumb = {
                    title: '',
                    short_title: '',
                    href: ''
                };
                breadcrumbs.addBreadcrumb(breadcrumb);
                $scope.$watch('title', function (value) {
                    breadcrumb.title = value;
                    breadcrumb.short_title = truncate(value + '', 32);
                    breadcrumbs.changed();
                });
                $scope.$watch('href', function (value) {
                    breadcrumb.href = value;
                    breadcrumbs.changed();
                });
            }
        };
    }]);

});
