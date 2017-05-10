(function () {
    angular.module('app').directive('pagenation', pagenation);
    /* @ng-inject */
    function pagenation() {
        return {
            restrict: 'E',
            templateUrl: '/directive/pagenation/pagenation.html',
            scope: {
                size: '=',
                allSize: '=',
                page: '='
            },
            controller: function ($scope) {

                $scope.index = {
                    size: 20,
                    page: 0
                };

                $scope.setPage = function (page) {
                    $scope.page = page;
                };

                $scope.nextPage = function () {
                    $scope.page++;
                    var max = Math.floor($scope.allSize / $scope.size);
                    if ($scope.page > max)
                        $scope.page = max;
                };


                $scope.prevPage = function () {
                    $scope.page--;
                    if ($scope.page < 0)
                        $scope.page = 0;
                };


                $scope.nextIndexPage = function () {
                    $scope.index.page++;
                    var max = Math.floor($scope.allSize / $scope.size / $scope.index.size);
                    if ($scope.index.page > max)
                        $scope.index.page = max;
                };


                $scope.prevIndexPage = function () {
                    $scope.index.page--;
                    if ($scope.index.page < 0)
                        $scope.index.page = 0;
                };


            }
        };
    }
})();