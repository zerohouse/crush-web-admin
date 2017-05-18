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
            },
            controller: function ($scope, Upload, pop, $ajax) {
                $scope.upload = function (file) {
                    if (!file)
                        return;
                    Upload.upload({
                        url: '/api/v1/file',
                        headers : {
                            MuseAccessId: $ajax.headers.MuseAccessId
                        },
                        data: {file: file, fileType: $scope.fileType}
                    }).then(function (resp) {
                        var data = resp.data;
                        if (data.state.code === 200) {
                            $scope.ngModel = data.data.downloadPath;
                            return;
                        }
                        if (data.state.description) {
                            pop.alert(data.state.description);
                        }
                    });
                };
            }
        };
    }
})();