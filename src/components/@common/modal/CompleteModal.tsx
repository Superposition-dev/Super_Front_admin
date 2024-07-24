import React from 'react'
import cn from '../../../lib/tailwindUtil'

interface ModalProps {
  children: React.ReactNode
  setState: React.Dispatch<React.SetStateAction<boolean>>
  value: string
  handler?: () => void
  addClass?: string
}

const CompleteModal = ({ children, value, setState, handler, addClass }: ModalProps) => {
  const handleConfirm = () => {
    handler && handler()
    setState(false)
  }

  return (
    <div className="fixed w-full h-full flex justify-center items-center left-0 top-0 z-20">
      <div onClick={handleConfirm} className="fixed w-full h-full bg-black opacity-20 -z-10"></div>
      <div className={cn('w-[420px] bg-white text-center rounded-md overflow-hidden', addClass)}>
        <div className="text-lg min-h-[180px] py-4 flex flex-col items-center justify-center">{children}</div>
        <div className="flex flex-row">
          <button
            onClick={handleConfirm}
            className="w-full duration-200 py-3 bg-main-medium text-white hover:opacity-80"
          >
            {value}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompleteModal
