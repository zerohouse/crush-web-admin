(function () {
    angular.module('app').directive('userSimple', userSimple);
    /* @ng-inject */
    function userSimple() {
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            template: '{{user.name}}(<a ui-sref="user({id:user.id})">{{user.id}}</a>)'
        };
    }
})();