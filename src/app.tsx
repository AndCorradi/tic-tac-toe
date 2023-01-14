import { useEffect, useState } from 'preact/hooks'
import { Card, CardState } from './components/Card'
import { checkIfAnyWon } from './logic/checkIfAnyWon'
import { Modal } from './components/Modal'

export type GridType = Array<CardState>

const defaultGrid: GridType = [
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none'
]

export function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [gridState, setGridState] = useState<GridType>(defaultGrid)
  const [turn, setTurn] = useState<'X' | 'O'>('X')
  const [moves, setMoves] = useState(0)
  const [winner, setWinner] = useState<'X' | 'O' | 'toe' | null>(null)
  const [score, setScore] = useState<{ X: number; O: number }>()

  useEffect(() => {
    const score = localStorage.getItem('score')

    if (score) {
      setScore(JSON.parse(score))
    } else {
      setScore({ O: 0, X: 0 })
    }
  }, [])

  const resetGame = () => {
    setIsOpen(false)
    setMoves(0)
    setTurn('X')
    setWinner(null)
    setGridState(defaultGrid)
  }

  const move = (pos: number, turn: CardState) => {
    if (moves === 9) return

    if (gridState[pos] !== 'none') return

    const copy = [...gridState]

    copy[pos] = turn

    switchTurn()
    setGridState(copy)
    setMoves(() => moves + 1)
  }

  const switchTurn = () => setTurn(turn === 'X' ? 'O' : 'X')

  const updateScore = (winner: string) => {
    let toUpdate = {
      X: score?.X ?? 0,
      O: score?.O ?? 0
    }

    if (winner == 'X') {
      toUpdate.X += 1
    } else {
      toUpdate.O += 1
    }

    setScore(toUpdate)
    localStorage.setItem('score', JSON.stringify(toUpdate))
  }

  const checkState = () => {
    const res = checkIfAnyWon(gridState)
    console.log(res)

    if (res) {
      setWinner(res.won)
      updateScore(res.won)
    } else if (moves === 9) {
      setWinner('toe')
    }
  }

  useEffect(() => {
    if (moves > 4) {
      checkState()
    }
  }, [moves])

  useEffect(() => {
    if (winner) {
      setIsOpen(true)
    }
  }, [winner])

  return (
    <>
      <Modal isOpen={isOpen} winner={winner} onClose={resetGame} />
      <div className="flex flex-col h-full">
        <div className="flex">
          <div className="ml-auto my-12 mr-2">
            <Card size={5} state={'X'} />
            <span className="text-3xl text-center text-white font-bold ml-[40%]">
              {score?.X ?? 0}
            </span>
          </div>
          <section className="my-10 pb-8 pt-4 px-8 rounded-xl bg-slate-100">
            <h1 className="text-4xl text-slate-900">Jogo da Velha</h1>
            <h3 className="mt-5 font-bold text-center text-slate-900">
              {turn} é a Sua Vez!
            </h3>
          </section>
          <div className="mr-auto my-12 ml-2">
            <Card size={5} state={'O'} />
            <span className="text-3xl text-center text-white font-bold ml-[40%]">
              {score?.O ?? 0}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 mx-auto">
          {gridState.map((cell, i) => (
            <Card
              key={i}
              size={6}
              state={gridState[i]}
              onClick={() => {
                move(i, turn)
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
