define(['app'], function (app) {
    app.controller('Dashboard.CategoriesCtrl', ['$scope', '$location', '$routeParams', 'categoriesFactory', 'ngTableParams', '$filter', '$q',
        function ($scope, $location, $routeParams, categoriesFactory, ngTableParams, $filter, $q) {
            var prms = angular.extend({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    id: 'desc'
                },
                filter: {}

            }, $location.search());

            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {
                    $location.search(params.url()); // put params in url
                    $scope.loading = true;
                    categoriesFactory.get(params.url(), function (res) {
                        $scope.loading = false;
                        $defer.resolve($scope.doctors = res.data);
                        $scope.tableParams.total(res.pager.total);
                        $scope.tableParams.page(res.pager.current);
                    });
                }

            });


            $scope.add = function () {
                $scope.doctors.unshift(new categoriesFactory({
                    '$edit': true
                }));
            }
            $scope.save = function (doctor) {
                //console.log(cost);
                var obj = new categoriesFactory(doctor);
                $scope.loading = true;
                obj.$save(function (res) {
                    doctor.$edit = false;
                    if (doctor.id == undefined) {
                        $scope.doctors.shift()
                        $scope.doctors.unshift(new categoriesFactory(res));
                    }
                    doctor = res;
                    $scope.loading = false;
//                    notify('Запис збережено');
                });
            }
            $scope.remove = function (doctor) {
                //console.log(cost);
                var obj = new categoriesFactory(doctor);
                $scope.loading = true;
                obj.$delete({id: doctor.id}, function (res) {
                    angular.forEach($scope.doctors, function (i, n) {
                        if (i == doctor) {
                            $scope.doctors.splice(n, 1);
                        }
                    });
                    $scope.loading = false;
//                    notify('Запис видалено');
                });
            }

        }]);
});