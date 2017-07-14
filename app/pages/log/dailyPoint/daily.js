var list = [];
(function () {
    angular.module('app').controller('dailyPointCtrl', dailyPointCtrl);
    /* @ng-inject */
    function dailyPointCtrl($ajax, $scope) {

        $scope.toggle = function (array) {
            array.forEach(c => c.select = !c.select);
        };

        function CashEvent(type, name, amount) {
            this.type = type;
            this.name = name;
            this.amount = amount;
        }

        $scope.events = [
            new CashEvent("OPEN_MORE_TODAYCARD", "투데이 카드 더보기", -30),
            new CashEvent("LIKE_TODAYUSER", "오늘의 카드 좋아요", -5),
            new CashEvent("LIKE_HISTORYUSER", "지나간 인연 카드 좋아요", -10),
            new CashEvent("RETRY_LIKEUSER", "좋아요 다시 요청하기", -15),
            new CashEvent("UNBLOCK_CHATROOM", "채팅방 잠금 해제", -30),
            new CashEvent("OPEN_CARDIMAGE", "카드 이미지 잠금 해제", -1),
            new CashEvent("VOICE_ADD_RECORD", "보이스 추가", -30),
            new CashEvent("OPEN_BEST_TODAY_CARD", "상위 10%", -50),
            new CashEvent("OPEN_HIDDEN_FAVOR", "호감해준 사용자 보기", -5),
            new CashEvent("CANCEL_UNBLOCKCHAT", "채팅방 잠금해제비용 보상", 30),
            new CashEvent("STORE_REVIEW", "리뷰 쓰러가기 보상", 10),
            new CashEvent("TODAY_LOGINPOINT", "일일 로그인 무료지급", 2),
            new CashEvent("IAP_CHARGE", "스토어 구매 충전"),
            new CashEvent("SMS_INVITE", "초대하기 무료지급"),
            new CashEvent("TEST", "개발용 테스트 지급/차감"),
            new CashEvent("ADMIN_POINT", "운영자 지급/차감"),
            new CashEvent("SIGNUP_POINT", "회원가입 축하 지급"),
            new CashEvent("OPEN_LOCAL_TODAYCARD", "지역별 투데이 카드 더보기"),
            new CashEvent("OPEN_CUSTOM_TODAY", "맞춤 소개 받기")];

        function Type(fn, name) {
            this.name = name;
            this.fn = fn;
        }

        $scope.types = [
            new Type(log => log.famount + log.mamount, "합계-양"),
            new Type(log => log.mamount, "남자-양"),
            new Type(log => log.famount, "여자-양"),
            new Type(log => log.fsize + log.msize, "합계-횟수"),
            new Type(log => log.msize, "남자-횟수"),
            new Type(log => log.fsize, "여자-횟수"),
        ];

        var labels = [];

        $ajax.get('/admin/dailyPointLog').then(function (results) {
            list = $scope.list = results;
            list.forEach(log => labels.pushIfNotExist(log.day));
        });

        var watch = $scope.$watch('types', drawChart, true);
        var ewatch = $scope.$watch('events', drawChart, true);

        $scope.$on('$destroy', function () {
           watch();
           ewatch();
        });

        function drawChart() {
            var selects = $scope.selects = $scope.events.filter(e => e.select).map(e => e.type);
            var types = $scope.types.filter(e => e.select);
            if (selects.length === 0 || types.length === 0)
                return;
            var series = $scope.series = [];
            var data = $scope.data = [];
            types.forEach(t => {
                selects.forEach(s => {
                    series.push(`${s}(${t.name})`);
                    data.push(list.filter(log => s === log.cashEvent).map(t.fn));
                });
            });
            makeChart(data, series, labels);
        }


        function makeChart(data, series, labels) {
            $scope.labels = labels;
            $scope.series = series;
            $scope.data = data;
            $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-1'}];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                            // ticks: {
                            //     beginAtZero: true
                            // }
                        }
                    ]
                }
            };
        }
    }
})();