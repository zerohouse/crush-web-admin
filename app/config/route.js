/* @ngInject */
angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("manage", {
                url: "/manage",
                templateUrl: '/pages/manage.html'
            })
            .state("setting", {
                url: "/manage/setting",
                templateUrl: '/pages/setting/setting.html'
            })
            .state("notice", {
                url: "/manage/notice",
                templateUrl: '/pages/notice/notice.html',
                controller: 'noticeCtrl'
            })
            .state("values", {
                url: "/manage/values",
                templateUrl: '/pages/values/values.html',
                controller: 'valuesCtrl'
            })
            .state("chat", {
                url: "/manage/chat",
                templateUrl: '/pages/chat/chat.html',
                controller: 'chatCtrl'
            })
            .state("users", {
                url: "/manage/users",
                templateUrl: '/pages/users/users.html',
                controller: 'usersCtrl'
            })
            .state("userTest", {
                url: "/manage/userTest",
                templateUrl: '/pages/userTest/users.html',
                controller: 'userTestCtrl'
            })
            .state("roles", {
                url: "/manage/users/role",
                templateUrl: '/pages/roles/roles.html',
                controller: 'rolesCtrl'
            })
            .state("push", {
                url: "/manage/push",
                templateUrl: '/pages/push/push.html',
                controller: 'pushCtrl'
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
            .state("allVoices", {
                url: "/manage/voices/all",
                templateUrl: '/pages/voices/allVoices.html',
                controller: 'allVoicesCtrl'
            })
            .state("voiceChats", {
                url: "/manage/voices/chats",
                templateUrl: '/pages/voices/chat.html',
                controller: 'voiceChatCtrl'
            })
            .state("review", {
                url: "/manage/review/:id",
                templateUrl: '/pages/review/review.html',
                controller: 'reviewCtrl'
            })
            .state("dailyLog", {
                url: "/manage/dailyLog",
                templateUrl: '/pages/log/daily/daily.html',
                controller: 'dailyCtrl'
            })
            .state("dailyPointLog", {
                url: "/manage/dailyPointLog",
                templateUrl: '/pages/log/dailyPoint/daily.html',
                controller: 'dailyPointCtrl'
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

        $urlRouterProvider.otherwise("/manage");
    });
