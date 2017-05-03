/* @ngInject */
angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("main", {
                url: "/",
                templateUrl: '/pages/main/main.html'
            })
            .state("users", {
                url: "/manage/users",
                templateUrl: '/pages/users/users.html',
                controller: 'usersCtrl'
            })
            .state("user", {
                url: "/manage/user/:id",
                templateUrl: '/pages/user/user.html',
                controller: 'userCtrl'
            })
            .state("reviews", {
                url: "/manage/reviews",
                templateUrl: '/pages/reviews/reviews.html',
                controller: 'reviewsCtrl'
            })
            .state("review", {
                url: "/manage/review/:id",
                templateUrl: '/pages/review/review.html',
                controller: 'reviewCtrl'
            })
            .state("dailyLog", {
                url: "/manage/log/daily",
                templateUrl: '/pages/log/daily/daily.html',
                controller: 'dailyCtrl'
            })
        ;

        $urlRouterProvider.otherwise("/404");
    });
