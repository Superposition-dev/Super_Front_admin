import { useRef, useState } from 'react'
import Search from '../components/@common/Search'
import Wrapper from '../components/@common/Wrapper'
import Button from '../components/@common/Button'
import Label from '../components/@common/Label'
import useHasScroll from '../hooks/useHasScroll'
import cn from '../lib/tailwindUtil'

const AuthorPage = () => {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [text, setText] = useState<string>()
  const [limit, setLimit] = useState<string>()
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasScroll = useHasScroll(scrollRef)
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

  return (
    <Wrapper title="작가관리">
      <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
        <Search filter={filter} state={state} setState={setState} handler={() => console.log('조회 버튼 클릭')} />
        <div className="flex flex-col items-center justify-between gap-4 w-full h-[90%]">
          <Button name="작가 등록" addClass="self-end" onClick={() => console.log('작가 등록 버튼 클릭')} />
          <section className="flex flex-col items-center justify-between gap-3 w-full h-[92%] p-5 rounded-2xl bg-white shadow-light">
            <div className="flex items-center gap-1 w-full">
              <Label name="검색 건수" addClass="text-sm" />
              <Label name="5건" addClass="bg-transparent font-bold" />
              <Label name="전체" addClass="text-sm" />
              <Label name="20건" addClass="bg-transparent font-bold" />
              <Label name="검색일자" addClass="text-sm" />
              <Label name="2023.01.01 - 2024.04.01" addClass="bg-transparent font-bold" />
            </div>
            <div className="flex flex-col items-center justify-between gap-2 w-full h-[83%] border-y border-default border-opacity-5">
              <div className="flex flex-col w-full h-[91%]">
                <div className={cn('w-full', hasScroll ? 'pr-2' : '')}>
                  <table className="w-full table-fixed break-all">
                    <colgroup>
                      <col width="10%" />
                      <col width="10%" />
                      <col width="20%" />
                      <col width="20%" />
                      <col width="20%" />
                      <col width="20%" />
                    </colgroup>
                    <thead>
                      <tr className="h-14 text-gray-400 border-b border-default border-opacity-5 font-medium">
                        <th>선택</th>
                        <th>번호</th>
                        <th>작가명</th>
                        <th>ID</th>
                        <th>회원 유무</th>
                        <th>등록일</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="block w-full h-full overflow-auto" ref={scrollRef}>
                  <table className="w-full table-fixed break-all">
                    <colgroup>
                      <col width="10%" />
                      <col width="10%" />
                      <col width="20%" />
                      <col width="20%" />
                      <col width="20%" />
                      <col width="20%" />
                    </colgroup>
                    <tbody>
                      <tr className="w-full h-14 text-center border-b border-default border-opacity-5">
                        <td className="w-40">Y</td>
                        <td>1</td>
                        <td>작가1</td>
                        <td>작가ID</td>
                        <td>Y</td>
                        <td>2024-01-01</td>
                      </tr>
                      <tr className="h-14 text-center border-b border-default border-opacity-5">
                        <td>Y</td>
                        <td>1</td>
                        <td>작가1</td>
                        <td>작가ID</td>
                        <td>Y</td>
                        <td>2024-01-01</td>
                      </tr>
                      <tr className="h-14 text-center border-b border-default border-opacity-5">
                        <td>Y</td>
                        <td>1</td>
                        <td>작가1</td>
                        <td>작가ID</td>
                        <td>Y</td>
                        <td>2024-01-01</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex gap-3 self-end pb-4">
                <Button name="선택 삭제" onClick={() => console.log('선택 삭제 버튼 클릭')} />
                <Button name="전체 삭제" onClick={() => console.log('전체 삭제 버튼 클릭')} />
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
