(function () {
    angular.module('app').controller('dailyCtrl', dailyCtrl);
    /* @ng-inject */
    function dailyCtrl($ajax, $scope) {
        $ajax.get('/admin/dailyLog').then(logs => {
            $scope.logs = logs;
            logs.forEach(log=>{
               var day = log.day;
               log.day = moment(day, "YYYY-MM-DD").format('YYYY-MM-DD(dd)');
            });
            makeChart(logs);
        });


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