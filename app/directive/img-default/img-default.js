angular.module('app').directive('imgDefault', function ($timeout) {
    var img = 'http://www.mollywatt.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';
    return {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function () {
                angular.element(this).attr("src", iAttrs.imgDefault || img);
            });
            $timeout(function () {
                if(!iAttrs.ngSrc)
                    iElement.attr("src", iAttrs.imgDefault || img);
            });
        }
    };
});
