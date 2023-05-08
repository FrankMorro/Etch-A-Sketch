let btnRestore = document.getElementById('btnRestore')
let inputPixel = document.getElementById('countPixel')
let lienzo = document.getElementById('lienzo')
let intPixel = Number(countPixel.value)
let border = document.getElementById('border')
let pencil = document.getElementById('pencil')
let draft = document.getElementById('draft')

let colorUser = document.querySelector('#colorUser')
let colorPredeterminado = '#000000'

let randomColor = document.getElementById('randomColor')

let divPadre = document.getElementById('lienzo')
let color = colorPredeterminado
let myBorderColor = 'white'
let isMouseDown = false
let sizeLienzo = 580

const MAX_PIXEL = 100
const MIN_PIXEL = 1

border.onclick = alternateBorder
pencil.onclick = alternatePencil
draft.onclick = activeDraft
randomColor.onclick = alternateRandomColor

btnRestore.onclick = restoreLienzo

startup()
addPixel()

function startup() {
  colorUser = document.querySelector('#colorUser')
  colorUser.value = colorPredeterminado
  colorUser.addEventListener('input', actualizarPrimero, false)
  // colorUser.addEventListener('change', actualizarTodo, false)
  colorUser.select()
}

function restoreLienzo() {
  let divHijos = divPadre.getElementsByTagName('div')

  color = colorPredeterminado
  colorUser.value = colorPredeterminado
  activeColorBorder()

  for (let i = 0; i < divHijos.length; i++) {
    let divHijo = divHijos[i]
    divHijo.style.backgroundColor = color
    divHijo.style.border = `0.15px solid ${myBorderColor}`
  }
}

function alternateRandomColor() {
  if (draft.checked === true) {
    activeColorBorder()
  } else {
    if (randomColor.checked === true) {
      color = getRandomColor()
      myBorderColor = color
      colorUser.disabled = true
    } else {
      color = colorUser.value
      myBorderColor = color
      colorUser.disabled = false
    }
  }
}

function getRandomColor() {
  var r = Math.floor(Math.random() * 256)
  var g = Math.floor(Math.random() * 256)
  var b = Math.floor(Math.random() * 256)
  return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}

function addTenPercentToColor(color) {
  var r = Math.floor(color.r * 1.1)
  var g = Math.floor(color.g * 1.1)
  var b = Math.floor(color.b * 1.1)

  return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}

function activeColorBorder() {
  if (border.checked === true) {
    color = 'white'
    myBorderColor = 'rgb(233, 230, 230)'
  } else {
    color = 'white'
    myBorderColor = color
  }
}

function actualizarPrimero(event) {
  color = event.target.value
  myBorderColor = color
}

function activeDraft() {
  if (draft.checked === true) {
    divPadre.style.cursor = 'url("./img/draft24.png"), auto'
    activeColorBorder()
  } else {
    divPadre.style.cursor = 'default'
    color = colorUser.value
    myBorderColor = color
  }
}

function addPixel() {
  intPixel = Number(inputPixel.value)

  if (intPixel < MIN_PIXEL || intPixel > MAX_PIXEL) {
    alert(
      'The number of pixels must be between ' + MIN_PIXEL + ' and ' + MAX_PIXEL
    )

    return
  }

  limpiarDiv()

  let myCountPixel = intPixel

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

  alternateBorder()
}

function limpiarDiv() {
  if (lienzo != null) {
    while (lienzo.firstChild) {
      //lienzo.className('restore')
      lienzo.removeChild(lienzo.firstChild)
    }
  }
}

function alternateBorder() {
  myBorderColor = color

  if (draft.checked === true) {
    myBorderColor = 'rgb(233, 230, 230)'
  }

  if (border.checked === true) {
    addBorder()
  } else {
    removeBorder()
  }
}

function alternatePencil() {
  if (pencil.checked === true) {
    isMouseDown = true
  } else {
    isMouseDown = false
  }
}

function addBorder() {
  let lienzo = document.getElementById('lienzo')
  let div = lienzo.getElementsByTagName('div')

  for (let i = 0; i < div.length; i++) {
    if (div[i].style.backgroundColor !== 'white') {
      div[i].style.border = `0.15px solid ${div[i].style.backgroundColor}`
    } else {
      div[i].style.border = '0.15px solid rgb(233, 230, 230)'
    }
  }
}

function removeBorder() {
  let lienzo = document.getElementById('lienzo')
  let div = lienzo.getElementsByTagName('div')
  for (let i = 0; i < div.length; i++) {
    div[i].style.border = 'none'
  }
}

document
  .getElementById('countPixel')
  .addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      // Esto se ejecutará al presionar Enter
      addPixel()
    }
  })

divPadre.addEventListener('mousedown', function () {
  isMouseDown = true
})

divPadre.addEventListener('mouseup', function () {
  isMouseDown = false
})

divPadre.addEventListener('mousemove', function (event) {
  alternateRandomColor()
  if (isMouseDown) {
    let divHijos = divPadre.getElementsByTagName('div')
    for (let i = 0; i < divHijos.length; i++) {
      let divHijo = divHijos[i]

      if (event.target == divHijo) {
        divHijo.style.backgroundColor = color
        divHijo.style.border = `0.15px solid ${myBorderColor}`
      }
    }
  }
})

divPadre.addEventListener('click', function (event) {
  pencil.checked = false
  alternateRandomColor()

  let divHijos = divPadre.getElementsByTagName('div')

  for (let i = 0; i < divHijos.length; i++) {
    let divHijo = divHijos[i]
    if (event.target == divHijo) {
      divHijo.style.backgroundColor = color
      divHijo.style.border = `0.15px solid ${myBorderColor}`
    }
  }
})

divPadre.addEventListener('dblclick', () => {
  pencil.checked = true
  alternatePencil()
})
