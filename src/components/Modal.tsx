import { Card } from './Card'

type ModalProps = {
  isOpen: boolean
  winner: 'X' | 'O' | 'toe' | null
  onClose(): void
}

export function Modal({ isOpen, winner, onClose }: ModalProps) {
  return (
    <>
      <div
        className={
          'w-full h-full absolute items-center z-20 ' + (isOpen ? '' : 'hidden')
        }
      >
        <div className="bg-slate-400 h-48 w-96 flex flex-col mx-auto justify-center gap-4 mt-[20vh] rounded-3xl">
          <h1 className="text-slate-900 text-2xl font-bold text-center mx-auto">
            Fim de Jogo
          </h1>
          {winner == 'O' || winner == 'X' ? (
            <div className="inline-flex items-center gap-2 mx-auto">
              <span className="text-slate-900">O</span>
              <Card size={2} state={winner} />
              <span className="text-slate-900">é o vencedor</span>
            </div>
          ) : (
            <span className="mx-auto text-slate-900">Deu velha :(</span>
          )}
          <button
            className="bg-slate-900 text-white p-2 mx-auto rounded-lg"
            onClick={onClose}
          >
            Recomeçar
          </button>
        </div>
      </div>
      <div
        className={
          'absolute w-full h-full bg-neutral-200 opacity-40 z-10 ' +
          (isOpen ? '' : 'hidden')
        }
      ></div>
    </>
  )
}
