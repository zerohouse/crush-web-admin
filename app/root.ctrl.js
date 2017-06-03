(function () {
    angular.module('app').run(rootScopeSetting);
    /* @ng-inject */
    function rootScopeSetting($rootScope, $ajax, pop, popup) {

        $rootScope.user = {};

        $rootScope.loginPopup = () => {
            popup.open('login', $rootScope);
        };

        function getUser() {
            $ajax.get('/account/myinfo').then(function (user) {
                angular.copy(user, $rootScope.user);
            });
        }
        getUser();

        $rootScope.login = user => {
            $ajax.post('/account/signin', user).then(function () {
                getUser();
                $rootScope.close();
            }, function (err) {
                pop.alert(err.data.description);
            });
        };

        $rootScope.logout = () => {
            $ajax.post('/account/logout').then(function () {
                angular.copy({}, $rootScope.user);
            });
        };

    }
})();