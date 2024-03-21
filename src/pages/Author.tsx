import { useState } from 'react'
import Search from '../components/@common/Search'
import Wrapper from '../components/@common/Wrapper'
import Button, { type } from '../components/@common/Button'
import TInteraction from '../components/@common/table/TInteraction'
import Table from '../components/@common/table/Table'

const AuthorPage = () => {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [text, setText] = useState<string>()
  const [limit, setLimit] = useState<string>()
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
    { select: false, num: 1, name: '작가1', id: 'author1', isUser: true, date: '2024-01-24' },
    { select: false, num: 2, name: '작가2', id: 'author2', isUser: true, date: '2024-01-24' },
    { select: false, num: 3, name: '작가3', id: 'author3', isUser: true, date: '2024-01-24' },
    { select: false, num: 4, name: '작가4', id: 'author4', isUser: false, date: '2024-01-24' },
    { select: false, num: 5, name: '작가5', id: 'author5', isUser: false, date: '2024-01-24' },
    { select: false, num: 6, name: '작가6', id: 'author6', isUser: false, date: '2024-01-24' },
  ]

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
          <section className="flex flex-col items-center justify-between gap-3 w-full h-[92%] p-5 rounded-2xl bg-white shadow-light">
            <TInteraction
              search={{ name: '검색 건수', value: 5 }}
              total={{ name: '전체', value: 20 }}
              date={{ name: '검색일자', value: '2023.01.01 - 2024.04.01' }}
            />
            <div className="flex flex-col items-center justify-between gap-2 w-full h-[83%] border-y border-default border-opacity-5">
              <Table thead={THeadData} tbody={TBodyData} addClass="h-[91%]" />

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
            <div className="flex items-center justify-center h-14">12345</div>
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

export default AuthorPage
