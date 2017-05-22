(function () {
    angular.module('app').directive('updateUserBtnSet', updateUserBtnSet);
    /* @ng-inject */
    function updateUserBtnSet() {
        return {
            restrict: 'E',
            templateUrl: '/directive/update-user-btn-set/updateset.html'
        };
    }
})();