define(['app'], function (app) {
    app.controller('Dashboard.MainCtrl', ['$scope', '$location', '$routeParams', 'doctorsFactory', 'categoriesFactory', 'journalsFactory',
        function ($scope, $location, $routeParams, doctorsFactory, categoriesFactory, journalsFactory) {
            $scope.doctors = [];
            $scope.journals = [];
            $scope.categories = [];
            $scope.journals = [];


            $scope.loading = true;

            $scope.$watch('date', function(){
                journalsFactory.get({date: $scope.date}, function (res) {
                    $scope.journals = res.data;
                    console.log($scope.journals);
                    $scope.loading = false;
                    $scope.needSave = false;
                });
            });
            $scope.date = moment().format('YYYY-MM-01');

            doctorsFactory.get({count: 100}, function (res) {
                $scope.doctors = res.data;
            });
            categoriesFactory.get({count: 100}, function (res) {
                $scope.categories = res.data;
            });

            $scope.save = function() {
                $scope.loading = true;
                journalsFactory.save({'data': $scope.journals, 'date': $scope.date}, function(){
                    $scope.loading = false;
                    $scope.needSave = false;
                });
            }

            $scope.needSave = false;
            $scope.$watchCollection('journals', function (oldV, newV) {
//                console.log(oldV, newV, newV.length);
                if(angular.isUndefined(newV.length)) {
                    $scope.needSave = true;
                }
//                $scope.needSave = true;
            });
        }]);
});