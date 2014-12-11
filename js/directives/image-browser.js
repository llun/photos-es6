app.directive('imageBrowser', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'partials/image-browser.html',
    transclude: true,
    scope: {},
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      var input = element.find('input')[0]
      input.addEventListener('change', function(e) {
        var file = e.target.files[0]
        ngModel.$setViewValue(file)
        scope.$apply()
      })

      scope.browse = function(e) {
        var input = element.find('input')[0]
        input.click()
      }
    }
  }
}])