(function () {
    angular.module('app').directive('multiOptions', multiOptions);
    /* @ng-inject */
    function multiOptions() {
        return {
            restrict: 'E',
            templateUrl: '/directive/multi-options/multi-options.html',
            scope: {
                options: '=',
                ngModel: '=',
                label: '@'
            },
            controller: function ($scope) {
                $scope.change = function (option) {
                    if (!$scope.ngModel)
                        $scope.ngModel = [];
                    $scope.ngModel.push(option);
                };
            }
        };
    }
})();