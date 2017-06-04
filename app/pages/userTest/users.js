(function () {
    angular.module('app').controller('userTestCtrl', userTestCtrl);
    /* @ng-inject */
    function userTestCtrl($ajax, $scope, queryService) {

        if (queryService.usersQuery)
            $scope.query = queryService.testUsersQuery;
        else
            queryService.testUsersQuery = $scope.testUsersQuery = {size: 10, page: 0, testable: true};
        $scope.users = [];
        $scope.sizes = [10, 30, 50];

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

        $scope.updateForTest = function (user) {
            $ajax.post('/admin/user/test', {userid: user.id}).then(function (res) {
                angular.copy(res, user);
            });
        };

    }
})();