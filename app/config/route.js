/* @ngInject */
angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
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
            .state("voices", {
                url: "/manage/voices",
                templateUrl: '/pages/voices/voices.html',
                controller: 'voicesCtrl'
            })
            .state("review", {
                url: "/manage/review/:id",
                templateUrl: '/pages/review/review.html',
                controller: 'reviewCtrl'
            })
            .state("dailyLog", {
                url: "/manage",
                templateUrl: '/pages/log/daily/daily.html',
                controller: 'dailyCtrl'
            })
            .state("purchaseLog", {
                url: "/manage/log/purchase",
                templateUrl: '/pages/log/purchase/purchase.html',
                controller: 'purchaseCtrl'
            })
            .state("pointLog", {
                url: "/manage/log/point",
                templateUrl: '/pages/log/point/point.html',
                controller: 'pointCtrl'
            })
            .state("likeLog", {
                url: "/manage/log/like",
                templateUrl: '/pages/log/like/like.html',
                controller: 'likeCtrl'
            })
        ;

        $urlRouterProvider.otherwise("/404");
    });
