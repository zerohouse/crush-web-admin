(function () {
    angular.module('app').directive('appSetting', appSettings);
    /* @ng-inject */
    function appSettings() {
        return {
            restrict: 'E',
            scope: {
                os: '@'
            },
            controller: function ($ajax, $scope, pop) {
                var url = $scope.os === 'ANDROID' ? "/systemCheck" : "/systemCheck/ios";
                $ajax.get(url).then(function (setting) {
                    setSetting(setting);
                });

                $scope.save = function () {
                    if(angular.equals($scope.setting, $scope.originalSetting)){
                        pop.alert("변경된 내용이 없습니다.");
                        return;
                    }
                    $scope.setting.updatedAt = null;
                    $scope.setting.createdAt = null;
                    $ajax.post('/admin/setting/' + $scope.os, $scope.setting).then(function () {
                        pop.alert('버전 변경됨');
                    });
                };

                function setSetting(setting) {
                    $scope.setting = {};
                    angular.copy(setting, $scope.setting);
                    $scope.originalSetting = setting;
                }
            },
            templateUrl: '/directive/app-setting/app-setting.html'
        };
    }
})();