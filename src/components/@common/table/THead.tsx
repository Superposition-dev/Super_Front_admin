import cn from '../../../lib/tailwindUtil'
import { THeadType } from './Table'

export interface THeadProps {
  thead: Array<THeadType>
  hasScroll?: boolean
}

const THead = ({ thead, hasScroll }: THeadProps) => {
  return (
    <div className={cn('w-full', hasScroll ? 'pr-2' : '')}>
      <table className="w-full table-fixed break-all">
        <colgroup>
          {thead.map((item, index) => {
            return <col key={index} width={`${item.width}%`} />
          })}
        </colgroup>
        <thead>
          <tr className="h-14 text-gray-400 border-b border-default border-opacity-5 font-medium">
            {thead.map((item, index) => {
              return <th key={index}>{item.name}</th>
            })}
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default THead
