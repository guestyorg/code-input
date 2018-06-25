# ng-code-input

UI component for handling code retrival with seperate input elements

![gif](https://cdn.filestackcontent.com/tq2GYDx5SaejcrpHJjE0)

### Installing

```
npm i ng-code-input
```

Include the ng-code-input modules in your application

    var app = angular.module('myapp', ['ng-code-input']);


### Basic example
The most basic use of the directive in html
```html
<code-input
    ng-model="ctrl.code" 
    digits="3" 
    class="my-custom-class">
</code-input>
```

With a related angular controller:
```javascript
var app = angular.module('myApp')
.controller('ctrl', ['$scope', function ($scope){
    $scope.code = null;
}]);
```

### Options
| Attribute  | Description | Default value | Required |
| :--- | :--- | :---: | :---: |
| digits  | number of **digits** to display  | 3  | optional |
| class  | custom class  | default  | optional |

### MIT Licence
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
