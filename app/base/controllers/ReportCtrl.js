define(['app'], function (app) {
    app.controller('Dashboard.ReportCtrl', ['$scope', '$location', '$routeParams', 'doctorsFactory', 'categoriesFactory', 'journalsFactory',
        function ($scope, $location, $routeParams, doctorsFactory, categoriesFactory, journalsFactory) {
            $scope.doctors = [];
            $scope.journals = [];
            $scope.categories = [];
            $scope.journals = [];


            $scope.loading = true;

            $scope.$on('dataLoad', function(){
                if($scope.month && $scope.year) {
                    journalsFactory.getReport({year: $scope.year, month: $scope.month}, function (res) {
                        $scope.journals = res.data;
                        $scope.loading = false;
                    });
                }
            });
            $scope.$watch('year', function(){
                $scope.$emit('dataLoad');
            });
            $scope.$watch('month', function(){
                $scope.$emit('dataLoad');
            });

            $scope.year = parseInt(moment().format('YYYY'), 10);
            $scope.month = parseInt(Math.ceil(parseInt(moment().format('MM'))/3)*3, 10);

            $scope.years = [];
            var startYear = 2014;
            var nowYear = parseInt(moment().format('YYYY'), 10);
            for (var i = startYear; i <= nowYear; i++) {
                $scope.years.push(i);
            }
            $scope.months = [3, 6, 9, 12];

            doctorsFactory.get({count: 100}, function (res) {
                $scope.doctors = res.data;
            });
            categoriesFactory.get({count: 100}, function (res) {
                $scope.categories = res.data;
            });
        }]);
});