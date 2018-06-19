(function (){
    'use strict';
    angular.module('ngCodeInput', []);

    angular.module('ngCodeInput').directive('ngCode', ngCodeDirective);

    angular.module('ngCodeInput').directive('moveNext', moveNextDirective);

    function moveNextDirective(){
        function link($scope, element, attr, ngModel){
            element.on('input', () => {
                if(element.val().length === 1) {
                    let $nextElement = element.next();
                    if($nextElement.length) {
                        $nextElement[0].focus();
                    }
                }
            });
            element.on('click', () => {
                ngModel.$setViewValue('');
                element.val('');
                $scope.$apply();
            });
        }

        return {
            restrict: 'A',
            link,
            require: 'ngModel'
        };
    }

    function ngCodeDirective() {

        function link($scope, element, attr, ngModel){
            const defaultLength = 3;

            if (!ngModel) return;

            $scope.myObject = [];
            $scope.digitsArray = new Array(+$scope.digits || defaultLength);

            $scope.onChange = () => {
                if($scope.myObject.length === (+$scope.digits || defaultLength) && isArrayFull($scope.myObject)){
                    ngModel.$setViewValue($scope.myObject.join(''));
                }else{
                    ngModel.$setViewValue(null);
                }
            };

            $scope.myObj = {
                "box-shadow" : "0px 0px 3px 0px rgba(0,0,0,0.75)",
                "border-radius" : "5px",
                "width" : "70px",
                "margin" : "10px",
                "border" : "0",
                "font-size" : "60px",
                "text-align" : "center",
                "vertical-align" : "top",
                "text-transform" : "uppercase"
            };

            const isArrayFull = () => !$scope.myObject.some( item => 'undefined' === typeof item || null === item || item === '');
        }

        return {
            restrict: 'E',
            require: '?ngModel',
            scope: {
                digits: '<?',
                class: '@?'
            },
            template: `
        	<input ng-style="class || myObj" class="{{class}}" type="text" 
        		ng-repeat="digit in digitsArray track by $index" 
        		ng-change="onChange()" 
        		ng-model="myObject[$index]" 
        		maxlength="1" 
        		move-next
        	/>
        `,
            link
        };
    }
})();
