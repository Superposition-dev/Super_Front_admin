import React from 'react'
import { RiShieldUserLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

export interface WrapperProps {
  children: React.ReactNode
  title: string
}

const Wrapper = (props: WrapperProps) => {
  const { children, title } = props
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-between gap-6 w-full h-full py-4 px-6">
      <div className="flex justify-between items-center w-full h-12">
        <p className="text-[22px] font-bold">{title}</p>
        <div
          className="flex items-center justify-center gap-1.5 py-1.5 px-3.5 rounded-full border border-main-bright bg-white shadow-light cursor-pointer"
          onClick={() => {
            navigate('/mypage')
          }}
        >
          <RiShieldUserLine className="w-5 h-5 text-main-bright" />
          <h4 className="text-base leading-6 font-semibold text-default">aliyah521@gmail.com</h4>
        </div>
      </div>
      <div className="w-full h-full border-t border-default border-opacity-5 pt-6">{children}</div>
    </div>
  )
}

export default Wrapper
