(function () {
    angular.module('app').controller('voiceChatCtrl', voiceChatCtrl);
    /* @ng-inject */
    function voiceChatCtrl($ajax, $scope, queryService, $state) {

        if (queryService.voiceChatQuery)
            $scope.query = queryService.voiceChatQuery;
        else
            queryService.voiceChatQuery = $scope.query = {size: 10, page: 0};
        $scope.users = [];
        $scope.sizes = [10, 30, 50];


        var params = {};
        $scope.more = function () {
            if (angular.equals(params, $scope.query))
                return;
            angular.copy($scope.query, params);
            $ajax.get('/admin/voice/chats', params).then(function (response) {
                $scope.voiceChats = response.list;
                $scope.size = response.size;
            });
        };

        $scope.toChat = function (id) {
            if (!queryService.voiceQuery)
                queryService.voiceQuery = {size: 10, page: 0};
            queryService.voiceQuery.chatId = id;
            $state.go('allVoices');
        };

        $scope.search = function () {
            $scope.query.page = 0;
            $scope.more();
        };

        $scope.$watch('query.page', $scope.more);
        $scope.$watch('query.size', $scope.more);

        $scope.more();
    }
})();