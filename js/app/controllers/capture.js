export default ($scope, $http) => {

  $scope.resultClasses = "hidden"
  $scope.isFilterActionsDisabled = true
  $scope.isActionsDisabled = true

  $scope.filters = [
    { name: 'vintage', label: 'Vintage' },
    { name: 'lomo', label: 'Lomo' },
    { name: 'clarity', label: 'Clarity' },
    { name: 'sinCity', label: 'Sin City' },
    { name: 'sunrise', label: 'Sunrise' },
    { name: 'crossProcess', label: 'Cross Process' },
    { name: 'orangePeel', label: 'Orange Peel' },
    { name: 'love', label: 'Love' },
    { name: 'grungy', label: 'Grungy' }
  ]

  $scope.updateCanvas = () => {
    $scope.isActionsDisabled = false
    $scope.isFilterActionsDisabled = false
  }

  $scope.clearCanvas = () => {
    $scope.file = null
    $scope.isFilterActionsDisabled = true
    $scope.isActionsDisabled = true

    $scope.resultUrl = ""
    $scope.resultClasses = "hidden"
  }

  $scope.openResult = () => {
    open($scope.resultUrl, "_blank")
  }

  $scope.$watch('result', data => {
    if (data) {
      var stripPrefix = data.substring("data:image/png;base64,".length)

      var binary = StringView.base64ToBytes(stripPrefix)
      var zip = zlib.deflate(binary)
      var blob = new Blob([zip], { type: 'application/x-deflate' })

      $http.post('/upload', blob)
        .success(data, status, headers, config => {
          if (data.success) {
            $scope.resultUrl = data.url
            $scope.resultClasses = ""
          }
        })

    }
  })

}