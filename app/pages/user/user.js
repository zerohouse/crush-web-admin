(function () {
    angular.module('app').controller('userCtrl', userCtrl);
    /* @ng-inject */
    function userCtrl($ajax, $scope, $stateParams, pop, popup) {

        $scope.levels = ["ONE", "TWO", "THREE"];

        $scope.statuses = ["PROFILE_NOT_SUBMITTED", "PROFIlE_SUBMITTED", "PROFILE_REJECTED",
            "ON_ASSESS", "ASSESS_FAIL", "ASSESS_PASS", "APPROVED", "ON_ASSESS_APPROVED",
            "REQUEST_WITH_DRAW", "REST"
        ];

        $scope.user = new User();
        function User() {
        }


        $scope.getUserinfo = function (id) {
            $ajax.get('/admin/user', {id: id}).then(function (response) {
                angular.copy(response, $scope.user);
            });
        };

        if ($stateParams.id)
            $scope.getUserinfo($stateParams.id);


        $scope.options = {};

        $ajax.get('/profile/codeInfo', null, true).then(function (response) {
            $scope.options = response;
        });

        $scope.modify = function (user) {
            $ajax.put('/admin/user', user, true).then(function (response) {
                angular.copy(response, $scope.user);
                pop.alert("수정되었습니다.");
            });
        };

        $scope.delete = function (user) {
            popup.confirm(`ID:${user.id} 이름:${user.name}\n\n유저를 삭제 처리합니다.`).then(function () {
                $ajax.delete('/admin/user', {id: user.id}).then(function (response) {
                    angular.copy(response, $scope.user);
                    pop.alert("유저상태 변경(삭제)되었습니다.");
                });
            });
        };

    }
})();