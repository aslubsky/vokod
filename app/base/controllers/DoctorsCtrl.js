define(['app'], function (app) {
    app.controller('Dashboard.DoctorsCtrl', ['$scope', '$location', '$routeParams', 'doctorsFactory', 'ngTableParams', '$filter', '$q',
        function ($scope, $location, $routeParams, doctorsFactory, ngTableParams, $filter, $q) {
            //doctorsFactory.get()
//            console.log('DoctorsCtrl');

            var prms = angular.extend({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    id: 'asc'
                },
                filter: {}

            }, $location.search());

            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {
                    $location.search(params.url()); // put params in url
                    $scope.loading = true;
                    doctorsFactory.get(params.url(), function (res) {
                        $scope.loading = false;
                        $defer.resolve($scope.doctors = res.data);
                        $scope.tableParams.total(res.pager.total);
                        $scope.tableParams.page(res.pager.current);
                    });
                }

            });


            $scope.add = function () {
                $scope.doctors.unshift(new doctorsFactory({
                    '$edit': true
                }));
            }
            $scope.save = function (doctor) {
                //console.log(cost);
                var obj = new doctorsFactory(doctor);
                $scope.loading = true;
                obj.$save(function (res) {
                    doctor.$edit = false;
                    if (doctor.id == undefined) {
                        $scope.doctors.shift()
                        $scope.doctors.unshift(new doctorsFactory(res));
                    }
                    doctor = res;
                    $scope.loading = false;
//                    notify('Запис збережено');
                });
            }
            $scope.remove = function (doctor) {
                //console.log(cost);
                var obj = new doctorsFactory(doctor);
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