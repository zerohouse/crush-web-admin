(function () {
    angular.module('app').directive('dropOptions', dropOptions);
    /* @ng-inject */
    function dropOptions() {
        return {
            restrict: 'E',
            templateUrl: '/directive/drop-options/drop-options.html',
            scope: {
                options: '=',
                ngModel: '=',
                label: '@'
            }
        };
    }
})();