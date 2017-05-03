(function () {
    angular.module('app').controller('approvalCtrl', approvalCtrl);
    /* @ng-inject */
    function approvalCtrl($ajax, $scope, pop) {

        $scope.users = [];

        var page = 0;

        $scope.more = function () {
            $ajax.post('/api/v1/admin/users/approval', {page: page}, true).then(function (response) {
                $scope.users.pushAll(response);
                if (response.length === 0)
                    pop.alert('더 없습니다.');
                page++;
            });
        };

        $scope.more();

    }
})();