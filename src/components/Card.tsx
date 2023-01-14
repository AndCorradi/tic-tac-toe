import { X, Circle } from 'phosphor-react'

export type CardState = 'none' | 'X' | 'O'

type CardProps = {
  state: CardState
  size?: number
  onClick?(): void
}

export function Card({ state, size, onClick }: CardProps) {
  return (
    <div
      className="bg-slate-300 rounded-md"
      style={{ height: `${size ?? 5}rem`, width: `${size ?? 5}rem` }}
      onClick={onClick}
    >
      {state == 'X' ? (
        <X size={size ? size * 16 : 40} weight="bold" color="#0f172a" />
      ) : state == 'O' ? (
        <Circle size={size ? size * 16 : 40} weight="bold" color="#0f172a" />
      ) : null}
    </div>
  )
}
