(function () {
    angular.module('app').controller('voiceCtrl', voiceCtrl);
    /* @ng-inject */
    function voiceCtrl($ajax, $scope, pop) {

        $scope.voices = [];

        $scope.more = function () {
            $ajax.get('/api/v1/admin/voiceToApprove').then(function (voices) {
                $scope.voices.pushAll(voices);
            });
        };


        $scope.approve = function (id) {
            send(id, true);
        };

        $scope.reject = function (id) {
            send(id, true, prompt("사유?"));
        };

        function send(id, approve, message) {
            $ajax.post('/api/v1/admin/approveVoice', {
                id: id,
                message: message,
                approve: approve
            }).then(function () {
                pop.alert("처리 되었습니다.");
                $scope.voices.removeById(id);
            });
        }

        $scope.more();

    }
})();