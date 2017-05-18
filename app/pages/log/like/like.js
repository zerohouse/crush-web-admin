(function () {
    angular.module('app').controller('likeCtrl', likeCtrl);
    /* @ng-inject */
    function likeCtrl($ajax, $scope, queryService, $timeout) {

        if (queryService.likeQuery)
            $scope.query = queryService.likeQuery;
        else
            queryService.likeQuery = $scope.query = {size: 30, page: 0};

        var params = {};

        $scope.more = function () {
            if (angular.equals(params, $scope.query))
                return;
            angular.copy($scope.query, params);
            $ajax.get('/admin/likeLog', params).then(function (response) {
                $scope.logs = response.list;
                $scope.size = response.size;
            });
        };

        $scope.search = function () {
            $scope.query.page = 0;
            $scope.more();
        };

        $timeout(function () {
            $scope.$watch('query.page', $scope.more);
            $scope.$watch('query.size', $scope.more);
        }, 300);

        $scope.more();

        $scope.search = function () {
            $scope.query.page = 0;
            $scope.more();
        };


    }
})();