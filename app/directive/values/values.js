(function () {
    angular.module('app').directive('values', values);

    /* @ng-inject */
    function values() {
        return {
            restrict: 'E',
            templateUrl: '/directive/values/values.html',
            scope: {
                values: '='
            }
        };
    }
})();