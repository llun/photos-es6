var max_height = 500
var max_width = 500

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

var current_image = null
var image_dom = document.getElementById("image")
image_dom.onchange = function(imgEvt) {

  var file = imgEvt.target.files[0]

  var reader = new FileReader()
  reader.onload = function(readerEvt) {
    var new_image = new Image()
    new_image.src = readerEvt.target.result
    current_image = new_image
    draw_image(new_image)

    image_dom.value = ""

  }
  reader.readAsDataURL(file)

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

var reset = document.getElementById("reset")
reset.onclick = function() {
  draw_image(current_image)
}

var clear = document.getElementById("clear")
clear.onclick = function() {
  ctx.clearRect(0, 0, max_width, max_height)
  current_image = null
}

function draw_image(image) {
  var width = image.width > max_width ? max_width : image.width
  var ratio = width < image.width ? width/image.width : 1

  var height = image.height * ratio
  if (height > max_height) {
    height = max_height
    width = max_height / height * width
  }

  ctx.clearRect(0, 0, max_width, max_height)
  ctx.drawImage(image, 0, 0, width, height)
}
