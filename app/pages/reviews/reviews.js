(function () {
    angular.module('app').controller('reviewsCtrl', usersCtrl);
    /* @ng-inject */
    function usersCtrl($ajax, $scope, queryService, reviewService) {

        if (queryService.reviewsQuery)
            $scope.query = queryService.reviewsQuery;
        else
            queryService.reviewsQuery = $scope.query = {size: 10, page: 0};
        $scope.users = [];
        $scope.sizes = [10, 30, 50];

        var params = {};
        $scope.more = function () {
            if (angular.equals(params, $scope.query))
                return;
            angular.copy($scope.query, params);
            $ajax.get('/admin/review/users', params).then(function (response) {
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

        $scope.approve = reviewService.approve;

    }
})();