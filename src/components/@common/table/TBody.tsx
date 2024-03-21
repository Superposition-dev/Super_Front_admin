import { useRecoilState } from 'recoil'
import cn from '../../../lib/tailwindUtil'
import { TBodyType, THeadType } from './Table'
import { selectTableListAtom } from '../../../stores/atom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export interface TBodyProps {
  thead: Array<THeadType>
  tbody: Array<TBodyType>
  scrollRef: React.RefObject<HTMLDivElement>
}

const TBody = ({ thead, tbody, scrollRef }: TBodyProps) => {
  const [selectedTableList, setSelectedTableList] = useRecoilState(selectTableListAtom)
  const rowRefs = useRef<any[]>([])
  const selectRefs = useRef<any[]>([])
  const location = useLocation()
  const navigate = useNavigate()

  const selectedItem = (item: TBodyType) => {
    const index = selectedTableList.findIndex((select) => select.num === item.num)

    if (index === -1) {
      setSelectedTableList([...selectedTableList, item])
    } else {
      const copySelectedTableList = [...selectedTableList]
      copySelectedTableList.splice(index, 1)
      setSelectedTableList(copySelectedTableList)
    }
  }

  const navigated = (e: any, item: TBodyType) => {
    const current = e.target
    const selectCurrent = selectRefs.current[item.num]
    if (current.contains(selectCurrent)) {
      return
    } else navigate(`${location.pathname}/${item.num}`)
  }

  return (
    <div className="block w-full h-full overflow-auto" ref={scrollRef}>
      <table className="w-full table-fixed break-all">
        <colgroup>
          {thead.map((item, index) => {
            return <col key={index} width={`${item.width}%`} />
          })}
        </colgroup>
        <tbody>
          {tbody.map((item, index) => {
            return (
              <tr
                key={index}
                className="w-full h-14 text-center border-b border-default border-opacity-5 cursor-pointer"
                ref={(element: any) => (rowRefs.current[item.num] = element)}
                onClick={(e) => {
                  navigated(e, item)
                }}
              >
                {item.select !== undefined && (
                  <td className="block w-full h-14">
                    <label className="flex items-center justify-center w-full h-full" htmlFor={item.id}>
                      <input
                        type="checkbox"
                        id={item.id}
                        defaultChecked={item.select}
                        onChange={() => selectedItem(item)}
                        ref={(element: any) => (selectRefs.current[item.num] = element)}
                      />
                    </label>
                  </td>
                )}
                {item.num !== undefined && <td>{item.num}</td>}
                {item.name !== undefined && <td>{item.name}</td>}
                {item.id !== undefined && <td>{item.id}</td>}
                {item.isUser !== undefined && (
                  <td className={cn(item.isUser ? 'text-main-medium font-bold' : 'text-default text-opacity-30')}>
                    {item.isUser ? 'Y' : 'N'}
                  </td>
                )}
                {item.date !== undefined && <td>{item.date}</td>}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TBody
