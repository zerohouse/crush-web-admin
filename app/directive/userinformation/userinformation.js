(function () {
    angular.module('app').directive('userinformation', userinformation);
    /* @ng-inject */
    function userinformation() {
        return {
            restrict: 'E',
            templateUrl: '/directive/userinformation/userinformation.html',
            scope: {
                label: '@',
                userinformation: '=',
                gender: '=',
                options: '='
            },
            controller: function ($scope) {
                $scope.newPicture = () => {
                    if (!$scope.userinformation.pictures)
                        $scope.userinformation.pictures = [];
                    $scope.userinformation.pictures.push({});
                };
            }
        };
    }
})();