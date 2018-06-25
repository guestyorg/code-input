(function (){
'use strict';
angular.module('ng-code-input', []);
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

angular.module('ng-code-input').run(['$templateCache', function($templateCache) {$templateCache.put('code-input.html','<input ng-style="class || myObj" class={{class}} type=text ng-repeat="digit in digitsArray track by $index" ng-change=onChange() ng-model=myObject[$index] maxlength=1 move-next>');}]);
})()