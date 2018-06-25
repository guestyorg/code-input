(function (){
    var app = angular.module('myApp', ['ng-code-input'])

    app.controller('mainController', ['$scope', function($scope){
        $scope.code = null;
    }])
})()
