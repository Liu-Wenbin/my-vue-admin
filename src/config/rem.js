function setRem() {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  const htmlDom = document.getElementsByTagName('html')[0]
  htmlDom.style.fontSize = htmlWidth / (1024 / 12) + 'px'
}

setRem()

window.onresize = setRem