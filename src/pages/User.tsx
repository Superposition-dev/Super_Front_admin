import Search from '../components/@common/Search'
import Wrapper from '../components/@common/Wrapper'
import { useState } from 'react'
import TInteraction from '../components/@common/table/TInteraction'
import Table from '../components/@common/table/Table'
import Button, { type } from '../components/@common/Button'
import Pagination from '../components/@common/Pagination'
const UserPage = () => {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [text, setText] = useState<string>()
  const [limit, setLimit] = useState<string>()
  const [isFilter, setIsFilter] = useState<boolean>(false)
  const filter = ['전체', '회원명', 'ID']
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
    { name: '카카오계정', width: 20 },
    { name: '닉네임', width: 20 },
    { name: '작가 유무', width: 20 },
    { name: '가입일', width: 20 },
  ]

  const TBodyData = [{ select: false, num: 1, id: 'kakao1@kakao.com', name: 'user1', isUser: true, date: '2024-01-24' }]

  return (
    <Wrapper title="회원관리">
      <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
        <Search filter={filter} state={state} setState={setState} handler={() => console.log('조회 버튼 클릭')} />
        <div className="flex flex-col items-center justify-between gap-4 w-full h-[90%]">
          <div className="flex flex-row self-start gap-2">
            <Button name="전체" customType={isFilter ? type.white : type.fill} onClick={() => setIsFilter(false)} />
            <Button name="작가" customType={!isFilter ? type.white : type.fill} onClick={() => setIsFilter(true)} />
          </div>
          <section className="flex flex-col items-center justify-between gap-3 w-full h-[92%] p-5 rounded-2xl bg-white shadow-light">
            <TInteraction
              search={{ name: '검색 건수', value: 5 }}
              total={{ name: '전체', value: 20 }}
              date={{ name: '검색일자', value: '2023.01.01 - 2024.04.01' }}
            />
            <div className="flex flex-col items-center justify-between gap-2 w-full h-[83%] border-y border-default border-opacity-5">
              <Table thead={THeadData} tbody={TBodyData} addClass="h-[91%]" />

              <div className="flex gap-3 self-start pb-4">
                <Button
                  name="선택 탈퇴"
                  customType={type.empty}
                  addClass="px-3 py-1.5 text-sm"
                  onClick={() => console.log('선택 삭제 버튼 클릭')}
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

export default UserPage
