(function () {
    angular.module('app').controller('allVoicesCtrl', voicesCtrl);
    /* @ng-inject */
    function voicesCtrl($ajax, $scope, queryService, pop) {

        if (queryService.voiceQuery)
            $scope.query = queryService.voiceQuery;
        else
            queryService.voiceQuery = $scope.query = {size: 10, page: 0};
        $scope.users = [];

        var params = {};
        $scope.more = function () {
            if (angular.equals(params, $scope.query))
                return;
            angular.copy($scope.query, params);
            $ajax.get('/admin/allVoices', params).then(function (response) {
                $scope.voices = response.list;
                $scope.size = response.size;
            });
        };

        $scope.$watch('query.page', $scope.more);
        $scope.$watch('query.size', $scope.more);

        $scope.more();

        $scope.review = function (voice, ok) {
            $ajax.post('/admin/voice/approve', {id: voice.id, ok: ok}).then(function (response) {
                angular.copy(response, voice);
                pop.alert('리뷰완료');
            });
        };

    }
})();