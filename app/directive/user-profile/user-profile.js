(function () {
    angular.module('app').directive('userProfile', userProfile);
    /* @ng-inject */
    function userProfile() {
        return {
            restrict: 'E',
            templateUrl: '/directive/user-profile/user-profile.html',
            scope: {
                user: '='
            },
        };
    }
})();