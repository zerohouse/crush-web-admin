(function () {
    angular.module('app').run(ajaxConfig);
    /* @ng-inject */
    function ajaxConfig($ajax, popup, $state) {
        $ajax.headers.MuseAccessId = localStorage.getItem('museId');

        $ajax.handler((response, success, error) => {
                if ($state.current.name === 'apiTest') {
                    success(response);
                    return;
                }
                if (!response.code || response.code === "OK") {
                    success(response);
                    return;
                }
                if (response.description) {
                    popup.alert(response.description);
                }
                error(response);
            }
        );
    }
})();