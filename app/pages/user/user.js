(function () {
    angular.module('app').controller('userCtrl', userCtrl);
    /* @ng-inject */
    function userCtrl($ajax, $scope, $stateParams, pop, popup, $state, queryService, $http) {

        $scope.levels = ["ONE", "TWO", "THREE"];

        $scope.statuses = ["PROFILE_NOT_SUBMITTED", "PROFIlE_SUBMITTED", "PROFILE_REJECTED",
            "ON_ASSESS", "ASSESS_FAIL", "ASSESS_PASS", "APPROVED", "ON_ASSESS_APPROVED",
            "REQUEST_WITH_DRAW", "REST"
        ];

        $scope.user = new User();
        function User() {
        }

        $scope.openPoint = function () {
            popup.open('addPoint', $scope);
        };

        $scope.addPoint = function (amount) {
            $ajax.post('/admin/pointToUser', {userId: $scope.user.id, amount: amount}).then(function (response) {
                angular.copy(response, $scope.user);
                pop.alert(`포인트가 ${amount} 변경되었습니다.`);
                $scope.close();
            });
        };

        $scope.moveToPointLog = function () {
            queryService.pointQuery = {size: 30, page: 0, userid: $scope.user.id};
            $state.go('pointLog');
        };

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

        $scope.move = function (picture) {
            var index = prompt("몇번째?");
            if (isNaN(index) || index < 1) {
                pop.alert("이상한 숫자 안받음");
                return;
            }
            $scope.user.imageInfoList.remove(picture);
            if (index > $scope.user.imageInfoList.length)
                index = $scope.user.imageInfoList.length + 1;
            $scope.user.imageInfoList.splice(index - 1, 0, picture);
            $scope.user.imageInfoList.forEach((pic, i) => {
                pic.ordering = i + 1;
            });
        };

        $scope.newPicture = function (file) {
            // if (!file) {
            //     pop.alert("파일없음");
            //     return;
            // }
            $ajax.get("/profile/uploadImage/s3").then(function (r) {
                var fd = new FormData();
                fd.append('file', file);
                angular.forEach(r, (v, k) => {
                    fd.append(k, v);
                });
                var host = r.Host;
                $http.post("http://" + host, fd, {
                    transformRequest: angular.identity,
                    data: fd
                }).then(function (r) {
                    console.log(r);
                });
            });
        };

    }
})();