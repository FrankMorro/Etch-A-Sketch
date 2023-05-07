let btnAdd = document.getElementById('btnAdd')
let inputPixel = document.getElementById('countPixel')
let lienzo = document.getElementById('lienzo')
let intPixel = Number(countPixel.value)
let border = document.getElementById('border')
let pencil = document.getElementById('pencil')
let draft = document.getElementById('draft')

let colorUser = document.querySelector('#colorUser')
var colorPredeterminado = '#0000ff'

let divPadre = document.getElementById('lienzo')
let color = '#0000ff'
let myBorderColor = 'white'
let isMouseDown = false

const MAX_PIXEL = 100
const MIN_PIXEL = 1

border.onclick = alterBorder
pencil.onclick = alterPencil
draft.onclick = activeDraft

btnAdd.onclick = addPixel

function startup() {
  colorUser = document.querySelector('#colorUser')
  colorUser.value = colorPredeterminado
  colorUser.addEventListener('input', actualizarPrimero, false)
  // colorUser.addEventListener('change', actualizarTodo, false)
  colorUser.select()
}

startup()
addPixel()

function actualizarPrimero(event) {
  color = event.target.value
  myBorderColor = color
}

function activeDraft() {
  color = 'white'
  myBorderColor = color
  if (draft.checked === true) {
    divPadre.style.cursor = 'url("./img/draft24.png"), auto'

    if (border.checked === true) {
      myBorderColor = 'rgb(233, 230, 230)'
      color = 'white'
    } else {
      color = 'white'
      myBorderColor = color
    }
  } else {
    divPadre.style.cursor = 'default'
    color = colorUser.value
    myBorderColor = color
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

function addPixel() {
  intPixel = Number(inputPixel.value)

  if (intPixel < MIN_PIXEL || intPixel > MAX_PIXEL) {
    alert(
      'El número de pixeles debe estar entre ' + MIN_PIXEL + ' y ' + MAX_PIXEL
    )

    return
  }

  limpiarDiv()

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

function alterPencil() {
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

divPadre.addEventListener('mousedown', function () {
  isMouseDown = true
})

divPadre.addEventListener('mouseup', function () {
  isMouseDown = false
})

divPadre.addEventListener('mousemove', function (event) {
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
  alterPencil()
})
