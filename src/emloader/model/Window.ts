import IModule from './IEmscriptenModule'

declare global {
  interface Window {
    Module: IModule
    mozRequestAnimationFrame: any
    webkitRequestAnimationFrame: number
    mozCancelRequestAnimationFrame: any
    webkitCancelRequestAnimationFrame: any
    cancelRequestAnimationFrame: any
  }
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame
}
