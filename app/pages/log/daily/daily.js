(function () {
    angular.module('app').controller('dailyCtrl', dailyCtrl);

    /* @ng-inject */
    function dailyCtrl($ajax, $scope, queryService, $timeout, $rootScope) {

        if (queryService.dailyQuery)
            $scope.query = queryService.dailyQuery;
        else
            queryService.dailyQuery = $scope.query = {size: 30, page: 0};

        var params = {};

        $scope.detail = function () {
            return $rootScope.user && $rootScope.user.permissions.contains("DAILY_LOG_DETAIL");
        };

        $scope.more = function () {
            if (angular.equals(params, $scope.query))
                return;
            angular.copy($scope.query, params);
            $ajax.get('/admin/dailyLog', params).then(function (response) {
                $scope.logs = response.list;
                $scope.size = response.size;
                makeChart($scope.logs);
            });
        };

        $scope.search = function () {
            $scope.query.page = 0;
            $scope.more();
        };

        $timeout(function () {
            $scope.$watch('query.page', $scope.more);
            $scope.$watch('query.size', $scope.more);
        }, 300);

        $scope.more();


        function makeChart(logs) {
            var data = logs.slice(0, 10).sort((o, o2) => o.id - o2.id);
            $scope.labels = data.map(datum => datum.day);
            $scope.series = ['합계', '남', '여'];
            $scope.data = [
                data.map(datum => datum.mtodayNewUserCount + datum.ftodayNewUserCount),
                data.map(datum => datum.mtodayNewUserCount),
                data.map(datum => datum.ftodayNewUserCount),
            ];
            // $scope.onClick = function (points, evt) {
            //     console.log(points, evt);
            // };
            $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-1'}];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left',
                            ticks: {
                                beginAtZero: true
                            }
                        }

                        // {
                        //     id: 'y-axis-2',
                        //     type: 'linear',
                        //     display: true,
                        //     position: 'right',
                        //     ticks: {
                        //         beginAtZero: true
                        //     }
                        // }
                    ]
                }
            };
        }
    }
})();