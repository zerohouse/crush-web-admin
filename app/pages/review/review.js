(function () {
    angular.module('app').controller('reviewCtrl', userCtrl);
    /* @ng-inject */
    function userCtrl($ajax, $scope, $stateParams, reviewService) {

        $scope.user = new User();
        function User() {
        }


        $scope.getUserinfo = function (id) {
            $ajax.get('/admin/review/user', {id: id}).then(function (response) {
                angular.copy(response, $scope.user);
            });
        };

        if ($stateParams.id)
            $scope.getUserinfo($stateParams.id);

        $scope.approve = reviewService.approve;
    }
})();