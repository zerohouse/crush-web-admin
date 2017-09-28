(function () {
    angular.module('app').controller('chatCtrl', chatCtrl);

    /* @ng-inject */
    function chatCtrl($ajax, $scope) {
        $scope.getRooms = function (id) {
            $ajax.get('/admin/user/chat', {id: id}).then(function (res) {
                $scope.rooms = res.channels;
                $scope.rooms.forEach(function (room) {
                    room.member = room.members.find(function (o) {
                        return o.user_id + "" !== id + "";
                    });
                });
            });
        };

        $scope.getBlockUsers = function (id) {
            $ajax.get('/admin/user/chat/blockUsers', {id: id}).then(function (res) {
                $scope.users = res.users;
            });
        };

        $scope.unblock = function (id, user, block) {
            $ajax.post('/admin/user/chat/block', {id: id, target: user.user_id, block: block}).then(function () {
                user.unblock = !block;
            });
        };

        $scope.newBlock = function (id, target) {
            $ajax.post('/admin/user/chat/block', {id: id, target: target, block: true}).then(function (user) {
                $scope.users.unshift(user);
            });
        };

        $scope.newChat = function (id, target) {
            $ajax.post('/admin/user/chat', {id: id, target: target}).then(function (room) {
                $scope.rooms.unshift(room);
                $scope.getRooms(id);
            });
        };

        $scope.leaveChat = function (room, id, target) {
            $ajax.post('/admin/user/chat/leave', {id: id, target: target}).then(function () {
                $scope.rooms.remove(room);
            });
        };

        $scope.deleteChat = function (room, url) {
            if (!confirm("챗방 삭제합니다?"))
                return;
            $ajax.post('/admin/user/chat/delete', {url: url}).then(function () {
                $scope.rooms.remove(room);
            });
        };

    }
})();