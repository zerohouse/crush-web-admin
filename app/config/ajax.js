(function () {
    angular.module('app').run(ajaxConfig);
    /* @ng-inject */
    function ajaxConfig($ajax, pop) {
        $ajax.handler((response, success, error) => {
                if (response.data && response.data.description) {
                    pop.error(response.data.description);
                    error(response.data);
                    return;
                }
                if (response) {
                    success(response);
                }
            }
        );
    }
})();