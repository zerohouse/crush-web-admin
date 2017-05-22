(function () {
    angular.module('app').service('reviewService', reviewService);
    /* @ng-inject */
    function reviewService($ajax, pop, popup) {
        this.approve = function (users, user, score, update) {
            var params = {userId: user.id};
            if (!score) {
                params.pass = false;
                popup.select('reject', function (reason) {
                    params.message = reason;
                    $ajax.post('/admin/approve', params).then(function () {
                        user.result = "거절 : " + reason;
                        pop.alert(user.result);
                        users.remove(user);
                    });
                });
                return;
            }
            var string = update ? '업데이트 승인합니다.' : `${score}점으로 심사 승인합니다.`;
            popup.confirm(string).then(function () {
                params.score = score;
                params.pass = true;
                $ajax.post('/admin/approve', params).then(function () {
                    user.result = update ? "업데이트 수락" : `${score}점으로 심사 승인`;
                    pop.alert(user.result);
                    users.remove(user);
                });
            });
        };

    }
})();