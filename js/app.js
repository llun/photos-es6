var app = angular.module('photos', ['ngRoute'])
app.config(['$routeProvider',
	function($route) {
    $route
      .when('/capture', {
        templateUrl: 'partials/capture.html',
        controller: 'CaptureCtrl'
      })
      .otherwise({
        redirectTo: '/capture'
      })
  }])