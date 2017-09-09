namespace emloader {
  export interface IModule {
    arguments: Array<string>
    screenIsReadOnly: boolean
    print: Function
    printErr: Function
    canvas: HTMLCanvasElement
    noInitialRun: boolean
    preInit?: Function
    callMain?: {(arguments: Array<string>): void}
    addOnExit?: Function
    requestAnimationFrame?: any
    locateFile?: {(file: string): string}
  }

  export interface IModule_SDL_SendKeyboardKey {
    (state: number, scancode: number): void
  }
}
