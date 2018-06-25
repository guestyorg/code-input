angular.module('ng-code-input').directive('codeInput', ngCodeDirectiveController);

function ngCodeDirectiveController() {
    return {
        restrict: 'E',
        require: '?ngModel',
        scope: {
            digits: '<?',
            class: '@?'
        },
        templateUrl: 'code-input.html',
        link: link
    };

    function link($scope, element, attr, ngModel){
        var defaultLength = 3;

        if (!ngModel) return;

        $scope.myObject = [];
        $scope.digitsArray = new Array(+$scope.digits || defaultLength);

        $scope.onChange = function() {
            if($scope.myObject.length === (+$scope.digits || defaultLength) && isArrayFull($scope.myObject)){
                ngModel.$setViewValue($scope.myObject.join(''));
            }else{
                ngModel.$setViewValue(null);
            }
        };

        $scope.myObj = {
            'box-shadow' : '0px 0px 3px 0px rgba(0,0,0,0.75)',
            'border-radius' : '5px',
            'width' : '70px',
            'margin' : '10px',
            'border' : '0',
            'font-size' : '60px',
            'text-align' : 'center',
            'vertical-align' : 'top',
            'text-transform' : 'uppercase'
        };

        function isArrayFull(){
            return !$scope.myObject.some(function(item) {
                return 'undefined' === typeof item || null === item || item === '';
            });
        }
    }
}
