(function () {
    angular.module('app').directive('gender', gender);
    /* @ng-inject */
    function gender() {
        return {
            restrict: 'E',
            templateUrl: '/directive/gender/gender.html',
            scope: {
                ngModel: '='
            },
            controller: function ($scope) {
                $scope.switchGender = function () {
                    if ($scope.ngModel === "FEMALE") {
                        $scope.ngModel = "MALE";
                        return;
                    }
                    $scope.ngModel = "FEMALE";
                };
            }
        };
    }
})();