(function () {
    angular.module('app').run(rootScopeSetting);
    /* @ng-inject */
    function rootScopeSetting($rootScope, $ajax, pop, popup) {

        $rootScope.user = {};

        $rootScope.loginPopup = () => {
            popup.open('login', $rootScope);
        };

        $ajax.get('/account/myinfo').then(function (user) {
            angular.copy(user, $rootScope.user);
        });

        $rootScope.login = user => {
            $ajax.post('/account/signin', user).then(function (user) {
                angular.copy(user, $rootScope.user);
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