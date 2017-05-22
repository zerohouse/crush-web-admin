(function () {
    angular.module('app').directive('menus', menus);
    /* @ng-inject */
    function menus() {
        return {
            restrict: 'A',
            templateUrl: '/directive/menus/menus.html'
        };
    }
})();