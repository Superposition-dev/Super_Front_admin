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
  seq?: string | number | undefined
  authorId?: string
  date?: string | undefined
  email?: string | undefined
  isUser?: boolean | undefined
  isAuthor?: boolean | undefined
}

export interface TProductBodyType {
  select?: boolean | undefined
  productId: number
  title : string
  tags?: string[]
  author : string
  pictureInfo?: string
  price : string
}

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  thead: Array<THeadType>
  tbody: Array<TBodyType>
  index: boolean
  addClass?: string
  children: React.ReactNode
}

const Table = ({ thead, tbody, index, children, addClass, ...props }: TableProps) => {
  const setSelectedTableList = useSetRecoilState(selectTableListAtom)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasScroll = useHasScroll(scrollRef)

  useEffect(() => {
    setSelectedTableList([])
  }, [])

  return (
    <div className={cn('flex flex-col w-full h-full', addClass)} {...props}>
      <THead thead={thead} hasScroll={hasScroll} />
      <TBody thead={thead} scrollRef={scrollRef}>
        {children}
      </TBody>
    </div>
  )
}

export default Table
