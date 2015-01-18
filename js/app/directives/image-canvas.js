// import Caman from 'CamanJS'

class CanvasDOM {
  constructor() {
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

  load(image) {
    var reader = new FileReader()
    reader.onload = (readerEvt) => {
      var newImage = new Image()
      newImage.onload = () => {
        this.draw(newImage)
      }

      newImage.src = readerEvt.target.result
    }
    reader.readAsDataURL(image)
  }

  draw(image) {
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
}

export default () => {
  return {
    restrict: 'E',
    templateUrl: 'partials/image-canvas.html',
    scope: {
      image: '=image',
      result: '=result',
      save: '=save',
      applyFilter: '=applyFilter',
      resetFilter: '=resetFilter'
    },
    link: (scope, element, attrs) => {
      scope.$watch('image', (newValue, oldValue) => {
        var canvas = new CanvasDOM
        if (newValue) {
          canvas.load(newValue)
        }
      })

      scope.applyFilter = (filter) => {
        Caman("#canvas", () => {
          this[filter.name].apply(this).render()
        })
      }

      scope.resetFilter = () => {
        Caman("#canvas", () => {
          this.reset()
          this.render()
        })
      }

      scope.save = () => {
        var canvas = document.getElementById("canvas")
        scope.result = canvas.toDataURL()
      }
    }
  }
}
