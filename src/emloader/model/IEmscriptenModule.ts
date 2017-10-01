//namespace emloader {
  export default interface IEmscriptenModule {
    arguments: Array<string>
    screenIsReadOnly: boolean
    print: Function
    printErr: Function
    canvas: HTMLCanvasElement
    noInitialRun: boolean
    preInit?: Function
    callMain?: {(args: Array<string>): void}
    addOnExit?: Function
    requestAnimationFrame?: any
    locateFile?: {(file: string): string}
  }

  export interface IEmscriptenModule_SDL_SendKeyboardKey {
    (state: number, scancode: number): void
  }
//}
