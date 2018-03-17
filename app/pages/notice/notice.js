(function () {
    angular.module('app').controller('noticeCtrl', noticeCtrl);

    /* @ng-inject */
    function noticeCtrl($ajax, $scope, pop) {
        $ajax.get('/notice').then(function (res) {
            $scope.notices = res;
        });

        $scope.newNotice = function () {
            $scope.edit = {};
        };


        $scope.editNotice = function (notice) {
            $scope.edit = notice;
        };

        $scope.save = function (edit) {
            $ajax.post('/notice', edit, true).then(function (res) {
                var notice = $scope.notices.findById(res.id);
                pop.alert("저장~!!");
                $scope.edit = false;
                if (!notice) {
                    $scope.notices.push(res);
                    return;
                }
                angular.copy(res, notice);
            });
        };

        $scope.delete = function (notice) {
            var id = notice.id;
            if (!confirm(`${notice.title} 지움?`))
                return;
            $ajax.delete('/notice', {id: id}).then(function () {
                $scope.notices.removeById(id);
                pop.alert("삭제됨");
            });
        };

        $scope.show = function () {
            window.open('/scripts/notice.html', '_blank');
        };
    }
})();