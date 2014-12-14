app.directive('imageCanvas', [function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/image-canvas.html',
    scope: {
      image: '=image'
    },
    link: function(scope, element, attrs) {
      var clearCanvas = function() {
        var previous_canvas = document.getElementById("canvas")
        var parent = previous_canvas.parentElement
        parent.removeChild(previous_canvas)

        var element = document.createElement("canvas")
        element.id = "canvas"
        element.setAttribute("width", previous_canvas.getAttribute("width"))
        element.setAttribute("height", previous_canvas.getAttribute("height"))
        element.setAttribute("data-caman-hidpi-disabled", true)
        parent.appendChild(element)
      }

      var loadImage = function(file) {
        var reader = new FileReader()
        reader.onload = function(readerEvt) {
          var newImage = new Image()
          newImage.onload = function() {
            drawImage(newImage)
          }

          newImage.src = readerEvt.target.result
        }
        reader.readAsDataURL(file)
      }

      var drawImage = function(image) {
        var canvas = document.getElementById("canvas")

        var max_width = canvas.getAttribute("width")
        var max_height = canvas.getAttribute("height")

        var width = image.width
        var height = image.height

        if (width !== height) {
          if (width < height) {
            var ratio = max_width / width
            width = max_width
            height = height * ratio
          } else {
            var ratio = max_height / height
            height = max_height
            width = width * ratio
          }
        } else {
          width = max_width
          height = max_height
        }

        var ctx = canvas.getContext("2d")
        ctx.drawImage(image, 0, 0, width, height)
      }

      scope.$watch('image', function(newValue, oldValue) {
        clearCanvas()
        if (newValue) {
          loadImage(newValue)
        }
      })
    }
  }
}])