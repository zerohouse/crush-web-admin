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

        $scope.newRequestInfo = function () {
            popup.confirm("심사 대기 정보를 생성합니다.").then(function () {
                $scope.user.profileRequested = {};
            });
        };

        $scope.newUserInfo = function () {
            popup.confirm("심사 통과 정보를 생성하면 자동 승인처리 됩니다.").then(function () {
                $scope.user.profile = {};
            });
        };

        $scope.approve = function (user, approve) {
            var result = approve ? "승인" : "거절";
            popup.confirm(`심사 ${result}합니다.`).then(function () {
                var params = {id: user.id, approve: approve};
                if (!approve)
                    params.message = prompt("거절 사유?");
                $ajax.post('/api/v1/admin/approveUser', params).then(function (response) {
                    angular.copy(response, user);
                });
            });
        };
    }
})();