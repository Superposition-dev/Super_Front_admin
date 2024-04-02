import { THeadType } from './Table'

export interface TBodyProps {
  thead: Array<THeadType>
  scrollRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}

const TBody = ({ thead, scrollRef, children }: TBodyProps) => {
  return (
    <div className="block w-full h-full overflow-auto" ref={scrollRef}>
      <table className="w-full table-fixed break-all">
        <colgroup>
          {thead.map((item, index) => {
            return <col key={index} width={`${item.width}%`} />
          })}
        </colgroup>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export default TBody
