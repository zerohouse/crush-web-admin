(function () {
    angular.module('app').controller('usersCtrl', usersCtrl);
    /* @ng-inject */
    function usersCtrl($ajax, $scope, queryService) {

        if (queryService.usersQuery)
            $scope.query = queryService.usersQuery;
        else
            queryService.usersQuery = $scope.query = {size: 10, page: 0};
        $scope.users = [];
        $scope.sizes = [10, 30, 50];

        $scope.$watch('minApproveDate', date => {
            if (!date)
                return;
            $scope.query.minApproveDate = date.getTime();
        });

        var params = {};
        $scope.more = function () {
            if (angular.equals(params, $scope.query))
                return;
            angular.copy($scope.query, params);
            $ajax.get('/admin/users', params).then(function (response) {
                $scope.users = response.list;
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

    }
})();