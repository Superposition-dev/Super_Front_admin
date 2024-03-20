import { useEffect, useState } from 'react'
import logo from '../../assets/logo.webp'
import { PiGraphDuotone } from 'react-icons/pi'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { PiBooks } from 'react-icons/pi'
import { PiNotebookDuotone } from 'react-icons/pi'
import { PiFolderSimpleUser } from 'react-icons/pi'
import { TbLogout } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import cn from '../../lib/tailwindUtil'

const Sidebar = () => {
  const [pathname, setPathname] = useState<string>('')
  const location = useLocation()
  const MENU = [
    { title: '대시 보드', src: '/main', icon: <PiGraphDuotone className="w-full h-full" /> },
    { title: '전시 관리', src: '/exhibition', icon: <PiBooks className="w-full h-full" /> },
    { title: '작품 관리', src: '/product', icon: <PiNotebookDuotone className="w-full h-full" /> },
    { title: '작가 관리', src: '/author', icon: <PiFolderSimpleUser className="w-full h-full" /> },
    { title: '회원 관리', src: '/user', icon: <HiOutlineUserCircle className="w-full h-full" /> },
    { title: '로그아웃', src: '/', icon: <TbLogout className="w-full h-full" /> },
  ]

  useEffect(() => {
    setPathname(location.pathname)
  }, [location])

  return (
    pathname !== '/' && (
      <div className="flex flex-col items-center gap-12 w-[300px] h-full py-4 bg-main-medium">
        <Link to="/main" className="flex items-center justify-center w-full h-11">
          <img className="w-[57%]" src={logo} />
        </Link>
        <div className="flex flex-col items-center w-full">
          {MENU.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.src}
                className={cn(
                  'relative flex items-center justify-center gap-2 w-full h-16 text-white',
                  pathname === item.src ? 'bg-main-too-dark' : 'text-opacity-40',
                )}
              >
                <div className={cn('w-6 h-6', pathname === item.src && 'text-main-bright')}>{item.icon}</div>
                <p className="relative -top-[1px] w-1/2 text-base">{item.title}</p>
                {pathname === item.src && <div className="absolute top-0 left-0 w-1 h-full bg-main-bright"></div>}
              </Link>
            )
          })}
        </div>
      </div>
    )
  )
}

export default Sidebar
