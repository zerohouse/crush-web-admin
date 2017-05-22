(function () {
    var message = {};
    angular.module('app').controller('confirmCtrl', confirmCtrl);
    /* @ng-inject */
    function confirmCtrl($scope, popup) {
        $scope.message = message;
        $scope.ok = () => {
            message.ok();
            popup.close();
        };
        $scope.no = () => {
            message.no();
            popup.close();
        };
    }

    angular.module('app').service('popup', popupService);
    /* @ng-inject */
    function popupService($rootScope, $q, ngDialog) {

        this.confirm = (m, title) => {
            return $q((ok, no) => {
                message.message = m;
                message.title = title;
                message.ok = ok;
                message.no = ngDialog.close;
                ngDialog.openConfirm({
                    template: '/dialog/confirm.html',
                    scope: $rootScope,
                    disableAnimation: true
                }).then(ok, no);
            });

        };

        this.error = (message, classes) => {
            this.alert(message, classes);
            throw message;
        };

        this.open = function (template, scope) { //TODO scope종료될떄는 생각좀 해야함 destroy
            this.close();
            if (!template.match("html")) {
                template = "/dialog/" + template + ".html";
            }
            ngDialog.open({
                template: template,
                className: 'ngdialog-theme-default',
                scope: scope,
                disableAnimation: true
            });
        };


        this.select = function (template, fn) { //TODO scope종료될떄는 생각좀 해야함 destroy
            this.close();
            if (!template.match("html")) {
                template = "/dialog/" + template + ".html";
            }
            $rootScope.select = (val) => {
                this.close();
                fn(val);
            };
            ngDialog.open({template: template, className: 'ngdialog-theme-default', disableAnimation: true});
        };

        this.close = function () {
            ngDialog.close();
        };

        $rootScope.close = this.close;

    }
})();