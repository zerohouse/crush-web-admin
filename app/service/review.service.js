(function () {
    angular.module('app').service('reviewService', reviewService);
    /* @ng-inject */
    function reviewService($ajax, pop, popup) {
        this.approve = function (user, score) {
            var params = {userId: user.id};
            if (!score) {
                params.pass = false;
                popup.select('reject', function (reason) {
                    params.message = reason;
                    $ajax.post('/admin/approve', params).then(function () {
                        pop.alert('거절 처리되었습니다.');
                        user.result = "거절 : " + reason;
                    });
                });
                return;
            }
            popup.confirm(`심사 승인합니다.`).then(function () {
                score = score * 2;
                params.score = score;
                params.pass = true;
                $ajax.post('/admin/approve', params).then(function () {
                    pop.alert('프로필 업데이트 되었습니다.');
                    user.result = "업데이트 수락";
                });
            });
        };

    }
})();