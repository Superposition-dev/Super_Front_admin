import { HTMLAttributes, useEffect, useRef } from 'react'
import useHasScroll from '../../../hooks/useHasScroll'
import THead from './THead'
import TBody from './TBody'
import cn from '../../../lib/tailwindUtil'
import { useSetRecoilState } from 'recoil'
import { selectTableListAtom } from '../../../stores/atom'

export interface THeadType {
  name: string
  width: number
}

export interface TBodyType {
  select?: boolean | undefined
  num?: number | undefined
  name?: string | undefined
  email?: string | undefined
  title?: string | undefined
  subTitle?: string | undefined
  authorId?: string
  date?: string | undefined
  startDate?: string | undefined
  endDate?: string | undefined
  location?: string | undefined
  isUser?: boolean | undefined
  isAuthor?: boolean | undefined
  isExhibited?: string | undefined
  isShow?: boolean | undefined
}

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  thead: Array<THeadType>
  tbody: Array<TBodyType>
  index: boolean
  addClass?: string
  children: React.ReactNode
  theadClass?: string
}

const Table = ({ thead, tbody, index, children, addClass, theadClass, ...props }: TableProps) => {
  const setSelectedTableList = useSetRecoilState(selectTableListAtom)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasScroll = useHasScroll(scrollRef)

  useEffect(() => {
    setSelectedTableList([])
  }, [])

  return (
    <div className={cn('flex flex-col w-full h-full', addClass)} {...props}>
      <THead thead={thead} hasScroll={hasScroll} theadClass={theadClass} />
      <TBody thead={thead} scrollRef={scrollRef}>
        {children}
      </TBody>
    </div>
  )
}

export default Table
