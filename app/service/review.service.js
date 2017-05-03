(function () {
    angular.module('app').service('reviewService', reviewService);
    /* @ng-inject */
    function reviewService($ajax, popup) {
        this.approve = function (user, score) {
            var params = {userId: user.id};
            if (!score) {
                params.pass = false;
                popup.select('reject', function (reason) {
                    params.message = reason;
                    $ajax.post('/admin/approve', params).then(function () {
                        popup.alert('거절 처리되었습니다.');
                        user.result = "거절 : " +reason;
                    });
                });
                return;
            }
            else {
                params.score = score;
                params.pass = true;
            }

            $ajax.post('/admin/approve', params).then(function () {
                popup.alert('프로필 업데이트 되었습니다.');
                user.result = "업데이트 수락";
            });
        };

    }
})();