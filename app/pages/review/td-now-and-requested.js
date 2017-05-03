(function () {
    angular.module('app').directive('nowAndRequested', nowAndRequested);
    /* @ng-inject */
    function nowAndRequested() {
        return {
            restrict: 'A',
            template: '<td>{{label}}</td><td ng-class="{danger:data.now[key]!==data.requested[key]}">{{data.requested[key]}}</td><td>{{data.now[key]}}</td>',
            scope: {
                key: '@',
                label: '@',
                data: '='
            }
        };
    }
})();