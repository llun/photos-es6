app.controller('CaptureCtrl', ['$scope',
  function($scope) {
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

    $scope.updateCanvas = function() {
      console.log ("Updating canvas")
    }

    $scope.applyFilter = function(filter) {
      console.log(filter)
    }

    $scope.resetFilter = function() {

    }
  }])