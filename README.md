# facewrap

An AngularJS module wrapping Facebook login.

## Installing

- Download the minified module from /build
- Or, download the source file from /src

## Usage

```html
<html>
    <head>
        <script src="/path/to/angular.min.js"></script>
        <script src="/path/to/facewrap.min.js"></script>
        <script>
            angular.module('myApp', ['facewrap']).
                config(['$facewrapProvider', function($facewrapProvider) {
                    $facewrapProvider.init({
                        appId: '<your app id>'
                    });
                }]).
                controller('MyCtrl', function ($scope, $facewrap) {
                    $scope.test = function() {

                        // Check login status
                        $facewrap.getLoginStatus().then(function(response) {
                            console.log(response);
                        });

                        // Perform login
                        $facewrap.login().then(
                            function(response) { 
                                // Success
                            },
                            function(response) { 
                                // failed 
                            },
                        );

                        // Get profile
                        $facewrap.me().then(console.log);

                        // Chain promises
                        $facewrap.getLoginStatus().then($facewrap.me).then(console.log);
                    };
                });

        </script>
    </head>
    <body ng-app="myApp" ng-controller="MyCtrl">
        
    </body>
</html>
```
