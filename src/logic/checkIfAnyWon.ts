import { GridType } from '../app'

const winnable = ['012', '345', '678', '036', '147', '258', '048', '246']

type Res = {
  won: 'X' | 'O' | 'toe'
  line: string
} | null

export function checkIfAnyWon(arr: GridType): Res {
  let winner = null
  winnable.forEach((w) => {
    if (
      arr[Number(w[0])] == arr[Number(w[1])] &&
      arr[Number(w[2])] == arr[Number(w[1])] &&
      arr[Number(w[1])] !== 'none'
    ) {
      winner = {
        won: arr[Number(w[0])],
        line: w
      }
    }
  })

  return winner
}
