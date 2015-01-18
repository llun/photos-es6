export default () => {
  return {
    restrict: 'E',
    templateUrl: 'partials/image-browser.html',
    transclude: true,
    scope: {},
    require: 'ngModel',
    link: (scope, element, attrs, ngModel) => {
      var input = element.find('input')[0]
      input.addEventListener('change', e => {
        var file = e.target.files[0]
        ngModel.$setViewValue(file)
        scope.$apply()
      })

      scope.browse = (e) => {
        var input = element.find('input')[0]
        input.click()
      }
    }
  }
}