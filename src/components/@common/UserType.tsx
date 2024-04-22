import React from 'react'
import cn from '../../lib/tailwindUtil'

export interface UserTypeProps {
  general: boolean
  list: Array<string>
  onGeneral?: () => void
  onNotGeneral?: () => void
  addClass?: string
}

const UserType = ({ general, list, onGeneral, onNotGeneral, addClass }: UserTypeProps) => {
  return (
    <div
      className={cn(
        'w-[360px] flex justify-between items-center min-h-[64px] h-fit py-3 px-4 rounded-2xl bg-white shadow-light border border-transparent',
        addClass,
      )}
    >
      <p className="text-xl font-semibold">회원 구분</p>
      <div className=" flex gap-4 rounded-md">
        <div className="flex items-center gap-2 cursor-default" onClick={onGeneral}>
          <div className="w-6 h-6 border border-gray-300 rounded-full flex justify-center items-center">
            {general && <div className="w-4 h-4 bg-main-medium rounded-full"></div>}
          </div>
          <p>{list[0]}</p>
        </div>
        <div className="flex items-center gap-2 cursor-default" onClick={onNotGeneral}>
          <div className="w-6 h-6 border border-gray-300 rounded-full flex justify-center items-center">
            {!general && <div className="w-4 h-4 bg-main-medium rounded-full"></div>}
          </div>
          <p>{list[1]}</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(UserType)
