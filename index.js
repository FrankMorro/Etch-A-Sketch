let btnAdd = document.getElementById('btnAdd')
let inputPixel = document.getElementById('countPixel')
let lienzo = document.getElementById('lienzo')
let intPixel = Number(countPixel.value)
let border = document.getElementById('border')

let divPadre = document.getElementById('lienzo')
let color = 'black'
let isMouseDown = false

const MAX_PIXEL = 100
const MIN_PIXEL = 1

border.onclick = alterBorder

btnAdd.onclick = addPixel

addPixel()

document
  .getElementById('countPixel')
  .addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      // Esto se ejecutará al presionar Enter
      addPixel()
    }
  })

function addPixel() {
  limpiarDiv()

  intPixel = Number(inputPixel.value)

  if (intPixel < MIN_PIXEL || intPixel > MAX_PIXEL) {
    alert(
      'El número de pixeles debe estar entre ' + MIN_PIXEL + ' y ' + MAX_PIXEL
    )
    return
  }

  let myCountPixel = intPixel
  let sizeLienzo = 640
  let sizePixel = sizeLienzo / myCountPixel
  let countPixel = myCountPixel ** 2

  for (let i = 0; i < countPixel; i++) {
    let pixel = document.createElement('div')
    pixel.className = 'pixel'
    pixel.style.width = `${sizePixel}px`
    pixel.style.height = `${sizePixel}px`
    pixel.style.backgroundColor = 'white'

    lienzo.appendChild(pixel)
  }

  alterBorder()
}

function limpiarDiv() {
  if (lienzo != null) {
    while (lienzo.firstChild) {
      lienzo.removeChild(lienzo.firstChild)
    }
  }
}

function alterBorder() {
  if (border.checked === true) {
    addBorder()
  } else {
    removeBorder()
  }
}

function addBorder() {
  var myDiv = document.getElementById('lienzo')
  var div = myDiv.getElementsByTagName('div')

  for (var i = 0; i < div.length; i++) {
    if (div[i].style.backgroundColor !== 'white') {
      div[i].style.border = `0.15px solid ${color}`
    } else {
      div[i].style.border = '0.15px solid rgb(233, 230, 230)'
    }
  }
}

function removeBorder() {
  var myDiv = document.getElementById('lienzo')
  var div = myDiv.getElementsByTagName('div')
  for (var i = 0; i < div.length; i++) {
    div[i].style.border = 'none'
  }
}

// Aquí controlo en efecto clic del mouse

divPadre.addEventListener('mousedown', function () {
  isMouseDown = true
})

divPadre.addEventListener('mouseup', function () {
  isMouseDown = false
})

divPadre.addEventListener('mousemove', function (event) {
  if (isMouseDown) {
    var divHijos = divPadre.getElementsByTagName('div')
    for (var i = 0; i < divHijos.length; i++) {
      var divHijo = divHijos[i]
      if (event.target == divHijo) {
        divHijo.style.backgroundColor = color
        divHijo.style.border = color
      }
    }
  }
})

divPadre.addEventListener('click', function (event) {
  var divHijos = divPadre.getElementsByTagName('div')
  for (var i = 0; i < divHijos.length; i++) {
    var divHijo = divHijos[i]
    if (event.target == divHijo) {
      divHijo.style.backgroundColor = color
      divHijo.style.border = color
    }
  }
})
