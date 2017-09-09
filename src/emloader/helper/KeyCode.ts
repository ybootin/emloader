namespace emloader.helper {
  /**
   * Holds javascript keycode
   *  https://css-tricks.com/snippets/javascript/javascript-keycodes/
   */
  export class KeyCode {
    static backspace: number = 8
    static tab: number = 9
    static enter: number = 13
    static shift: number = 16
    static ctrl: number = 17
    static alt: number = 18
    static pauseBreak: number = 19
    static capsLock: number = 20
    static escape: number = 27
    static space: number = 32
    static pageup: number = 33
    static pagedown: number = 34
    static end: number = 35
    static home: number = 36
    static leftarrow: number = 37
    static uparrow: number = 38
    static rightarrow: number = 39
    static downarrow: number = 40
    static insert: number = 45
    static delete: number = 46
    static digit0: number = 48
    static digit1: number = 49
    static digit2: number = 50
    static digit3: number = 51
    static digit4: number = 52
    static digit5: number = 53
    static digit6: number = 54
    static digit7: number = 55
    static digit8: number = 56
    static digit9: number = 57
    static a: number = 65
    static b: number = 66
    static c: number = 67
    static d: number = 68
    static e: number = 69
    static f: number = 70
    static g: number = 71
    static h: number = 72
    static i: number = 73
    static j: number = 74
    static k: number = 75
    static l: number = 76
    static m: number = 77
    static n: number = 78
    static o: number = 79
    static p: number = 80
    static q: number = 81
    static r: number = 82
    static s: number = 83
    static t: number = 84
    static u: number = 85
    static v: number = 86
    static w: number = 87
    static x: number = 88
    static y: number = 89
    static z: number = 90
    static leftWindowKey: number = 91
    static rightWindowKey: number = 92
    static selectKey: number = 93
    static numpad0: number = 96
    static numpad1: number = 97
    static numpad2: number = 98
    static numpad3: number = 99
    static numpad4: number = 100
    static numpad5: number = 101
    static numpad6: number = 102
    static numpad7: number = 103
    static numpad8: number = 104
    static numpad9: number = 105
    static multiply: number = 106
    static add: number = 107
    static subtract: number = 109
    static decimalPoint: number = 110
    static divide: number = 111
    static f1: number = 112
    static f2: number = 113
    static f3: number = 114
    static f4: number = 115
    static f5: number = 116
    static f6: number = 117
    static f7: number = 118
    static f8: number = 119
    static f9: number = 120
    static f10: number = 121
    static f11: number = 122
    static f12: number = 123
    static numlock: number = 144
    static scrolllock: number = 145
    static semicolon: number = 186
    static equalsign: number = 187
    static comma: number = 188
    static dash: number = 189
    static period: number = 190
    static forwardslash: number = 191
    static graveAccent: number = 192
    static openbracket: number = 219
    static backslash: number = 220
    static closebraket: number = 221
    static singlequote: number = 222
  }

  // revert for quick access
  export var KeyCodeKey: Array<string> = new Array(222)
  for (var key in KeyCode) {
    KeyCodeKey[KeyCode[key]] = key
  }
}
