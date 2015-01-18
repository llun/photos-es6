import angular from 'angular'
import route from 'angular-route'
import CaptureCtrl from 'app/controllers/capture'
import ImageBrowser from 'app/directives/image-browser'
import ImageCanvas from 'app/directives/image-canvas'

var app = angular.module('photos', ['ngRoute'])
  .controller('CaptureCtrl', ['$scope', '$http', CaptureCtrl])
  .directive('imageBrowser', ImageBrowser)
  .directive('imageCanvas', ImageCanvas)
  .config(['$routeProvider', $route => {
    $route
      .when('/capture', {
        templateUrl: 'partials/capture.html',
        controller: 'CaptureCtrl'
      })
      .otherwise({
        redirectTo: '/capture'
      })
  }])

export default app;