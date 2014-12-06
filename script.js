var max_height = 500
var max_width = 500

var image = document.getElementById("image")
image.onchange = function(imgEvt) {

  var file = imgEvt.target.files[0]

  var reader = new FileReader()
  reader.onload = function(readerEvt) {
    var poster = new Image()
    poster.src = readerEvt.target.result

    var width = poster.width > max_width ? max_width : poster.width
    var ratio = width < poster.width ? width/poster.width : 1

    var height = poster.height * ratio
    if (height > max_height) {
      height = max_height
      width = max_height / height * width
    }

    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext('2d')
    ctx.drawImage(poster, 0, 0, width, height)

    image.value = ""

  }
  reader.readAsDataURL(file)

}
