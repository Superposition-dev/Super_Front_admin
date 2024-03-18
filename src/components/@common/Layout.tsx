import React from 'react'
import Sidebar from './Sidebar'

export interface LayoutProps {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props
  return (
    <div className="flex justify-center w-full h-screen">
      <div className="relative flex w-[1300px] h-screen">
        <Sidebar />
        <div className="w-full h-full bg-[#fafafa]">{children}</div>
      </div>
    </div>
  )
}

export default Layout
