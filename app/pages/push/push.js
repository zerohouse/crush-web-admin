(function () {
    angular.module('app').controller('pushCtrl', pushCtrl);
    /* @ng-inject */
    function pushCtrl($ajax, $scope, pop) {
        $scope.events = [
            "LIKE_CHECKED",
            "LIKE_RECEIVED",
            "LIKE_APPROVED",
            "PROFILE_APPROVED",
            "PROFILE_REJECTED",
            "FAVOR_MATCH",
            "VOICE_REPLY_RECEIVED"
        ];

        $scope.test = function (from, event) {
            $ajax.post('/admin/pushTest', {from: from, event: event}).then(function () {
                pop.alert("푸시보냄");
            });
        };

    }
})();