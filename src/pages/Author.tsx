import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Search from '../components/@common/atom/Search'
import Wrapper from '../components/@common/layout/Wrapper'
import TInteraction from '../components/@common/table/TInteraction'
import Table, { TBodyType } from '../components/@common/table/Table'
import Tr from '../components/@common/table/Tr'
import Td from '../components/@common/table/Td'
import Button, { type } from '../components/@common/atom/Button'
import Pagination from '../components/@common/Pagination'

const AuthorPage = () => {
  const [selectedList, setSelectedList] = useState<TBodyType[]>([])
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [text, setText] = useState<string>()
  const [limit, setLimit] = useState<string>()
  const selectRefs = useRef<any[]>([])
  const navigate = useNavigate()

  const filter = ['전체', '작가명', 'ID']

  const state = {
    startDate,
    endDate,
    text,
    limit,
  }

  const setState = {
    setStartDate,
    setEndDate,
    setText,
    setLimit,
  }

  const THeadData = [
    { name: '선택', width: 10 },
    { name: '번호', width: 10 },
    { name: '작가명', width: 20 },
    { name: 'ID', width: 20 },
    { name: '회원 유무', width: 20 },
    { name: '등록일', width: 20 },
  ]

  const TBodyData = [
    { select: false, name: '작가1', authorId: 'author1', isUser: true, date: '2024-01-24' },
    { select: false, name: '작가2', authorId: 'author2', isUser: true, date: '2024-01-24' },
    { select: false, name: '작가3', authorId: 'author3', isUser: true, date: '2024-01-24' },
    { select: false, name: '작가4', authorId: 'author4', isUser: false, date: '2024-01-24' },
    { select: false, name: '작가5', authorId: 'author5', isUser: false, date: '2024-01-24' },
    { select: false, name: '작가6', authorId: 'author6', isUser: false, date: '2024-01-24' },
  ]

  const selectedItem = (item: TBodyType) => {
    const index = selectedList.findIndex((select) => select.num === item.num)

    if (index === -1) {
      setSelectedList([...selectedList, item])
    } else {
      const copySelectedTableList = [...selectedList]
      copySelectedTableList.splice(index, 1)
      setSelectedList(copySelectedTableList)
    }
  }

  const navigated = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, item: TBodyType, index: number) => {
    const current = e.target as HTMLElement
    const selectCurrent = selectRefs.current[index]

    if (current.contains(selectCurrent)) {
      return
    } else {
      const path = item.authorId
      navigate(`${location.pathname}/${path}`)
    }
  }

  return (
    <Wrapper title="작가관리">
      <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
        <Search filter={filter} state={state} setState={setState} handler={() => console.log('조회 버튼 클릭')} />
        <div className="flex flex-col items-center justify-between gap-4 w-full h-[90%]">
          <Button
            name="작가 등록"
            customType={type.fill}
            addClass="self-end"
            onClick={() => console.log('작가 등록 버튼 클릭')}
          />
          <section className="flex flex-col items-center justify-between gap-3 w-full 2xl:h-[92%] h-[90%] p-5 rounded-2xl bg-white shadow-light">
            <TInteraction
              search={{ name: '검색 건수', value: 5 }}
              total={{ name: '전체', value: 20 }}
              date={{ name: '검색일자', value: '2023.01.01 - 2024.04.01' }}
            />
            <div className="flex flex-col items-center justify-between gap-2 w-full h-[83%] border-y border-default border-opacity-5">
              <Table thead={THeadData} tbody={TBodyData} index={false} addClass="h-[91%]">
                {TBodyData.map((item, index) => {
                  return (
                    <Tr
                      key={index}
                      onClick={(e) => {
                        navigated(e, item, index)
                      }}
                    >
                      <Td
                        type="checkbox"
                        id={String(item.authorId)}
                        defaultChecked={item.select}
                        onChange={() => selectedItem(item)}
                        selectRef={(element: any) => (selectRefs.current[index] = element)}
                      />
                      <Td value={index + 1} />
                      <Td value={item.name} />
                      <Td value={item.authorId} />
                      <Td
                        value={item.isUser ? 'Y' : 'N'}
                        addClass={item.isUser ? 'text-main-medium font-bold' : 'text-default text-opacity-30'}
                      />
                      <Td value={item.date} />
                    </Tr>
                  )
                })}
              </Table>
              <div className="flex gap-3 self-end pb-4">
                <Button
                  name="선택 삭제"
                  customType={type.empty}
                  addClass="px-3 py-1.5 text-sm"
                  onClick={() => console.log('선택 삭제 버튼 클릭')}
                />
                <Button
                  name="전체 삭제"
                  customType={type.empty}
                  addClass="px-3 py-1.5 text-sm"
                  onClick={() => console.log('전체 삭제 버튼 클릭')}
                />
              </div>
            </div>
            <Pagination totalItems={10} page={2} />
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

export default AuthorPage
