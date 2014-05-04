define(['app'], function (app) {

    app.directive('elsMenu', ['$parse', '$compile', 'bzUser', function ($parse, $compile, bzUser) {
        var template = '<ul ng-class="cssClass">' +
                '           <li ng-repeat="item in items" ng-class="{active:node.active && item.$active==true, \'dropdown\': item.items.length}">' +
                '               <a ng-if="!item.items.length" href="{{item.url}}">{{item.title}}' +
                '               <a ng-if="item.items.length" href="{{item.url}}" target="{{item.target}}"  data-toggle="dropdown" class="dropdown-toggle">{{item.title}}' +
                '               <b ng-if="item.items.length > 0" class="caret"></b></a>' +
                '               <div ng-if="item.items.length > 0" els-menu="item.items" menu-class="item.cssClass"></div>' +
                '           </li>' +
                '</ul>',
            el = null;
        return {
            restrict: 'A',
            scope: {
                'menu': '=elsMenu',
                'cssClass': '=menuClass'
            },
            replace: true,
            link: function (scope, element, attrs) {
                var currentMenu = null,
                    render = function (e) {
                        var menu = angular.copy(currentMenu);
                        if (angular.isArray(menu) && menu.length > 0) {
                            scope.items = [];
                            angular.forEach(menu, function (item, n) {
                                item.access = item.access || [];
                                item.cssClass = item.cssClass || [];
                                item.cssClass.push('dropdown-menu');
                                if (bzUser.has(item.access)) {
                                    scope.items.push(item);
                                }
                            });

                            var temp = (scope.items.length < 1) ? template : template.replace('class="dropdown-toggle"', '');
                            var el = angular.element(temp);
                            element.replaceWith(el);
                            element = el;
                            $compile(element)(scope)
                        }
                    };
                scope.$watch('menu', function (menu) {
                    if (angular.isDefined(menu)) {
                        currentMenu = menu;
                    }
                    render();
                });
                if (!el) {
                    el = element;
                    bzUser.$change(render);
                }
            }
        };
    }]);

});