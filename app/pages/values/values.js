(function () {
    angular.module('app').controller('valuesCtrl', valuesCtrl);

    /* @ng-inject */
    function valuesCtrl($ajax, $scope) {
        $ajax.get('/admin/values').then(function (res) {
            $scope.now = res.now;
            $scope.update = res.update;
        });
        $scope.save = function (config) {
            $ajax.post('/admin/values', config, true).then(function (res) {
                $scope.update = res;
            });
        };

    }
})();