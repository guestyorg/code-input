angular.module('ng-code-input').directive('moveNext', moveNextDirectiveController);

function moveNextDirectiveController() {
    return {
        restrict: 'A',
        link : link,
        require: 'ngModel'
    };

    function link($scope, element, attr, ngModel) {
        element.on('input', function() {
            if(element.val().length === 1){
                var $nextElement = element.next();
                if ($nextElement.length) {
                    $nextElement[0].focus();
                }
            }
        });
        element.on('click', function() {
            ngModel.$setViewValue('');
            element.val('');
            $scope.$apply();
        });
    }
}
