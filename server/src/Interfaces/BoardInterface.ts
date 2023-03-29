export interface Board {
  traders: Trader[],
  middle: { red: number, blue: number, white: number, black: number, yellow: number, FPToken: boolean }
}

export interface Trader {
  red: number, blue: number, white: number, black: number, yellow: number
}

export type Color = 'red' | 'blue' | 'white' | 'black' | 'yellow';