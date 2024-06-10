import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button, { type } from '../components/@common/atom/Button'
import Search from '../components/@common/atom/Search'
import Wrapper from '../components/@common/layout/Wrapper'
import TInteraction from '../components/@common/table/TInteraction'
import Table, { THeadType } from '../components/@common/table/Table'
import Tr from '../components/@common/table/Tr'
import Td from '../components/@common/table/Td'
import Pagination from '../components/@common/Pagination'
import Toggle from '../components/@common/atom/Toggle'

export interface ExhibitionType {
  select: false
  num: number
  title: string
  subTitle: string
  startDate: string
  endDate: string
  location: string
  isExhibited: '전시 예정' | '전시 중' | '전시 종료'
  isShow: false
}

const ExhibitionPage = () => {
  const [selectedList, setSelectedList] = useState<ExhibitionType[]>([])
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [text, setText] = useState<string>()
  const [limit, setLimit] = useState<string>()
  const [isFilter, setIsFilter] = useState<'all' | 'expected' | 'presented' | 'closed'>('all')
  const [active, setActive] = useState<boolean>(false)
  const selectRefs = useRef<any[]>([])
  const toggleRefs = useRef<any[]>([])
  const navigate = useNavigate()

  const filter = ['전체', '전시명', '작가명']

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

  const THeadData: THeadType[] = [
    { name: '선택', width: 5 },
    { name: '번호', width: 5 },
    { name: '전시 명', width: 15 },
    { name: '부제목', width: 20 },
    { name: '시작 일자', width: 13.75 },
    { name: '종료 일자', width: 13.75 },
    { name: '장소', width: 15 },
    { name: '진행 상태', width: 7.5 },
    { name: '노출 여부', width: 7.5 },
  ]

  const TBodyData: ExhibitionType[] = [
    {
      select: false,
      num: 1,
      title: '여기는 따뜻해',
      subTitle: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
      startDate: '2024-01-24',
      endDate: '2024-02-24',
      location: '성수지앵',
      isExhibited: '전시 중',
      isShow: false,
    },
  ]

  const selectedItem = (item: ExhibitionType) => {
    const index = selectedList.findIndex((select) => select.num === item.num)

    if (index === -1) {
      setSelectedList([...selectedList, item])
    } else {
      const copySelectedTableList = [...selectedList]
      copySelectedTableList.splice(index, 1)
      setSelectedList(copySelectedTableList)
    }
  }

  const navigated = (e: any, item: ExhibitionType, index: number) => {
    const current = e.target
    const selectCurrent = selectRefs.current[index]
    const toggleCurrent = toggleRefs.current[index]

    if (current.contains(selectCurrent) || toggleCurrent.contains(current)) {
      return
    } else {
      const path = item.num
      navigate(`${location.pathname}/${path}`)
    }
  }

  return (
    <Wrapper title="전시관리">
      <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
        <Search
          filter={filter}
          date="전시일자"
          state={state}
          setState={setState}
          handler={() => console.log('조회 버튼 클릭')}
        />
        <div className="flex flex-col items-center justify-between gap-4 w-full h-[90%]">
          <div className="flex item justify-between w-full">
            <div className="flex flex-row justify-start gap-2">
              <Button
                name="전체"
                customType={isFilter === 'all' ? type.fill : type.white}
                onClick={() => setIsFilter('all')}
              />
              <Button
                name="전시 예정"
                customType={isFilter === 'expected' ? type.fill : type.white}
                onClick={() => setIsFilter('expected')}
              />
              <Button
                name="전시 중"
                customType={isFilter === 'presented' ? type.fill : type.white}
                onClick={() => setIsFilter('presented')}
              />
              <Button
                name="전시 종료"
                customType={isFilter === 'closed' ? type.fill : type.white}
                onClick={() => setIsFilter('closed')}
              />
            </div>
            <Button
              name="전시 등록"
              customType={type.fill}
              addClass="self-end"
              onClick={() => navigate('/exhibition/post')}
            />
          </div>
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
                        defaultChecked={item.select}
                        onChange={() => selectedItem(item)}
                        selectRef={(element: any) => (selectRefs.current[index] = element)}
                      />
                      <Td value={item.num} />
                      <Td value={item.title} addClass="ellipsis text-center" />
                      <Td value={item.subTitle} addClass="ellipsis text-center" />
                      <Td value={item.startDate} />
                      <Td value={item.endDate} />
                      <Td value={item.location} />
                      <Td value={item.isExhibited} />
                      <Td>
                        <Toggle
                          active={active}
                          addClass="w-[70px] h-[36px]"
                          toggleRef={(element: any) => (toggleRefs.current[index] = element)}
                          onClick={() => setActive(!active)}
                        />
                      </Td>
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
              </div>
            </div>
            <Pagination totalItems={10} page={2} />
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

export default ExhibitionPage
