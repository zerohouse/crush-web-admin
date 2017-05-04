(function () {
    angular.module('app').directive('activeState', activeState);
    /* @ng-inject */
    function activeState($state) {
        return {
            restrict: 'A',
            link: function (scope, el, attr) {
                scope.$watch(function () {
                    return $state.current.name;
                }, function (name) {
                    if (attr.uiSref.match(name))
                        el.addClass('state-active');
                    else
                        el.removeClass('state-active');
                });
            }
        };
    }
})();

