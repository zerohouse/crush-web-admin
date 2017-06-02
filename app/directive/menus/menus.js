(function () {
    angular.module('app').directive('menus', menus);
    /* @ng-inject */
    function menus() {
        return {
            restrict: 'A',
            templateUrl: '/directive/menus/menus.html',
            controller: function ($scope, $rootScope) {
                $scope.hasRight = function (value) {
                    if (!$rootScope.user)
                        return false;
                    if (!$rootScope.user.permissions)
                        return false;
                    return $rootScope.user.permissions.contains(value);
                };
            }
        };
    }
})();