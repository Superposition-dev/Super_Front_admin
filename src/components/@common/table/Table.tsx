import { HTMLAttributes, useRef } from 'react'
import useHasScroll from '../../../hooks/useHasScroll'
import THead from './THead'
import TBody from './TBody'
import cn from '../../../lib/tailwindUtil'

export interface THeadType {
  name: string
  width: number
}

export interface TBodyType {
  select?: boolean | undefined
  num: number
  name?: string | undefined
  id?: string | undefined
  isUser?: boolean | undefined
  date?: string | undefined
}

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  thead: Array<THeadType>
  tbody: Array<TBodyType>
  addClass?: string
}

const Table = ({ thead, tbody, addClass, ...props }: TableProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasScroll = useHasScroll(scrollRef)

  return (
    <div className={cn('flex flex-col w-full h-full', addClass)} {...props}>
      <THead thead={thead} hasScroll={hasScroll} />
      <TBody thead={thead} tbody={tbody} scrollRef={scrollRef} />
    </div>
  )
}

export default Table
