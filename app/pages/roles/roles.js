(function () {
    angular.module('app').controller('rolesCtrl', rolesCtrl);
    /* @ng-inject */
    function rolesCtrl($ajax, $scope, queryService, pop, popup) {

        if (queryService.roleQuery)
            $scope.query = queryService.roleQuery;
        else
            queryService.roleQuery = $scope.query = {size: 10, page: 0};
        $scope.users = [];

        $scope.roles = [
            "ADMIN",
            "MARKETING",
            "OPERATION",
            "PUSH"
        ];

        var params = {};
        $scope.more = function () {
            if (angular.equals(params, $scope.query))
                return;
            angular.copy($scope.query, params);
            $ajax.get('/admin/users/role', params).then(function (response) {
                $scope.users = response.list;
                $scope.size = response.size;
            });
        };

        $scope.openNewRole = function () {
            popup.open('newrole', $scope);
        };

        $scope.updateRole = function (role, id, email) {
            $ajax.post('/admin/user/role', {role: role, id: id, email: email}).then(function (res) {
                pop.alert("권한이 변경되었습니다.");
                $scope.close();
                if (!role) {
                    $scope.users.removeById(res.id);
                    return;
                }
                if (!$scope.users.findById(res.id))
                    $scope.users.push(res);
            });
        };

        $scope.$watch('query.page', $scope.more);
        $scope.$watch('query.size', $scope.more);

        $scope.more();

    }
})();