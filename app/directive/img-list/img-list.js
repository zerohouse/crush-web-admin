(function () {
    angular.module('app').directive('imgList', inputAndLabel);
    /* @ng-inject */
    function inputAndLabel() {
        return {
            restrict: 'E',
            templateUrl: '/directive/img-list/img-list.html',
            scope: {
                list: '='
            }
        };
    }
})();