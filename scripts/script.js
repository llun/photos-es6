var max_width = 500
var max_height = 500

Caman.Filter.register("fitCrop", function() {
  if (this.imageWidth() !== this.imageHeight()) {
    var width = this.imageWidth()
    var height = this.imageHeight()

    if (this.imageWidth() < this.imageHeight()) {
      var ratio = max_width / width

      width = max_width
      height = height * ratio
    } else {
      var ratio = max_height / height
      height = max_height
      width = width * ratio
    }

    this.resize({
      width: width,
      height: height
    })
    this.crop(max_width, max_height)
  } else {
    this.resize({
      width: max_width,
      height: max_height
    })
  }
})

var current_image = null
var image_browser = document.getElementById("image")
image_browser.onchange = function(imgEvt) {

  var file = imgEvt.target.files[0]

  var reader = new FileReader()
  reader.onload = function(readerEvt) {
    clear_canvas()

    var new_image = new Image()
    new_image.src = readerEvt.target.result
    current_image = new_image

    Caman("#canvas", readerEvt.target.result, function() {
      this.fitCrop()
      this.render()
    })

    image_browser.value = ""
    clear_button.removeAttribute('disabled')

  }
  reader.readAsDataURL(file)

}

var browse_button = document.getElementById("image_button")
browse_button.onclick = function() {
  image_browser.click()
}

var buttons = document.querySelectorAll(".filters button")
for (var i = 0; i < buttons.length; i++) {
  var button = buttons[i]
  button.onclick = function(e) {
    if (!current_image) return

    var filter = e.target.getAttribute('data-filter')
    if (!filter) return

    Caman("#canvas", function() {
      this[filter].apply(this).render()
    })

  }
}

var reset_button = document.getElementById("reset")
reset_button.onclick = function() {
  Caman("#canvas", function() {
    this.reset()
    this.fitCrop()
    this.render()
  })
}

var clear_button = document.getElementById("clear")
clear_button.onclick = function() {
  if (!confirm("This will remove image below, do you want to continue?")) {
    return
  }

  clear_canvas()
}

function clear_canvas() {
  var previous_canvas = document.getElementById("canvas")
  var parent = previous_canvas.parentElement
  parent.removeChild(previous_canvas)

  var element = document.createElement("canvas")
  element.id = "canvas"
  element.setAttribute("width", previous_canvas.getAttribute("width"))
  element.setAttribute("height", previous_canvas.getAttribute("height"))
  parent.appendChild(element)

  current_image = null
  clear_button.setAttribute('disabled', true)
}

var save_button = document.getElementById("save")
save_button.onclick = function() {
  Caman("#canvas", function() {
    var data_uri = this.toBase64() + ""
    var strip_prefix = data_uri.substring("data:image/png;base64,".length)

    var binary = StringView.base64ToBytes(strip_prefix)
    var zip = zlib.deflate(binary)
    var blob = new Blob([zip], { type: 'application/x-deflate' })

    var request = new XMLHttpRequest()
    request.onload = function(requestEvt) {
    }
    request.open('POST', '/upload', true)
    request.send(blob)

  })
}

if (document.location.protocol === 'file:') {
  save_button.setAttribute("disabled", true)
}
clear_button.setAttribute('disabled', true)
