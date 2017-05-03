(function () {
    angular.module('app').controller('purchaseCtrl', purchaseCtrl);
    /* @ng-inject */
    function purchaseCtrl($ajax, $scope, queryService) {

        if (queryService.purchaseLogQuery)
            $scope.query = queryService.purchaseLogQuery;
        else
            queryService.purchaseLogQuery = $scope.query = {size: 30, page: 0};
        $scope.users = [];
        $scope.sizes = [10, 30, 50];

        var params = {};
        $scope.more = function () {
            if (angular.equals(params, $scope.query))
                return;
            angular.copy($scope.query, params);
            $ajax.get('/admin/purchaseLog', params).then(function (response) {
                $scope.logs = response.list;
                $scope.size = response.size;
            });
        };

        $scope.search = function () {
            $scope.query.page = 0;
            $scope.more();
        };

        $scope.$watch('query.page', $scope.more);
        $scope.$watch('query.size', $scope.more);

        $scope.more();

        $scope.nextPage = function () {
            $scope.query.page++;
            var max = Math.floor($scope.size / $scope.query.size);
            if ($scope.query.page > max)
                $scope.query.page = max;
        };

        $scope.prevPage = function () {
            $scope.query.page--;
            if ($scope.query.page < 0)
                $scope.query.page = 0;
        };

    }
})();