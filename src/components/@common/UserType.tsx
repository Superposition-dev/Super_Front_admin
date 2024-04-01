import React from 'react'

const UserType = ({ isAuthor }: { isAuthor: boolean }) => {
  return (
    <div className='w-[360px] flex justify-between items-center min-h-[64px] h-fit py-3 px-4 rounded-2xl bg-white shadow-light'>
      <p className='font-semibold'>회원 구분</p>
      <div className=" flex gap-4 rounded-md">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border border-gray-300 rounded-full flex justify-center items-center">
            {!isAuthor && <div className="w-4 h-4 bg-main-medium rounded-full"></div>}
          </div>
          <p>일반</p>
        </div>
        <div className='flex items-center gap-2'>
          <div className="w-6 h-6 border border-gray-300 rounded-full flex justify-center items-center">
            {isAuthor && <div className="w-4 h-4 bg-main-medium rounded-full"></div>}
          </div>
          <p>일반+작가</p>
        </div>
      </div>
    </div>
  )
}

export default UserType
