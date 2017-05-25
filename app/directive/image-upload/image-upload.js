(function () {
    angular.module('app').directive('imageUpload', imageUpload);
    /* @ng-inject */
    function imageUpload() {
        return {
            restrict: 'E',
            templateUrl: '/directive/image-upload/image-upload.html',
            scope: {
                ngModel: '=',
                fileType: '@',
                placeholder: '@'
            }
        };
    }
})();