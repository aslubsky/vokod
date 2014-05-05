define(['app'], function (app) {
    app.controller('Dashboard.ReportCtrl', ['$scope', '$location', '$routeParams', 'doctorsFactory', 'categoriesFactory', 'journalsFactory',
        function ($scope, $location, $routeParams, doctorsFactory, categoriesFactory, journalsFactory) {
            $scope.doctors = [];
            $scope.journals = [];
            $scope.categories = [];
            $scope.journals = [];


            $scope.loading = true;

            $scope.$on('dataLoad', function(){
                if($scope.quarter && $scope.year) {
                    journalsFactory.getReport({year: $scope.year, quarter: $scope.quarter}, function (res) {
                        $scope.journals = res.data;
                        $scope.loading = false;
                    });
                }
            });
            $scope.$watch('year', function(){
                $scope.$emit('dataLoad');
            });
            $scope.$watch('quarter', function(){
                $scope.$emit('dataLoad');
            });

            $scope.year = parseInt(moment().format('YYYY'), 10);
            $scope.quarter = parseInt(moment().format('Q'), 10);

            $scope.years = [];
            var startYear = 2014;
            var nowYear = parseInt(moment().format('YYYY'), 10);
            for (var i = startYear; i <= nowYear; i++) {
                $scope.years.push(i);
            }
            $scope.quarters = [1, 2, 3, 4];

            doctorsFactory.get({count: 100}, function (res) {
                $scope.doctors = res.data;
            });
            categoriesFactory.get({count: 100}, function (res) {
                $scope.categories = res.data;
            });
        }]);
});