(function () {
    angular.module('app').directive('inputAndLabel', inputAndLabel);
    /* @ng-inject */
    function inputAndLabel() {
        return {
            restrict: 'E',
            templateUrl: '/directive/input-and-label/input-and-label.html',
            scope: {
                ngModel: '=',
                label: '@',
                readonly: '=',
                type: '@',
                ngValue:'='
            }
        };
    }
})();