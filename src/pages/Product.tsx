import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Search from '../components/@common/atom/Search'
import Wrapper from '../components/@common/layout/Wrapper'
import TInteraction from '../components/@common/table/TInteraction'
import Table, { TBodyType, TProductBodyType } from '../components/@common/table/Table'
import Tr from '../components/@common/table/Tr'
import Td from '../components/@common/table/Td'
import Button, { type } from '../components/@common/atom/Button'
import Pagination from '../components/@common/Pagination'

const ProductPage = () => {
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
    { name: '작품코드', width: 10 },
    { name: '작품명', width: 20 },
    { name: '작가명', width: 20 },
    { name: '태그', width: 20 },
    { name: '정보', width: 20 },
    { name: '가격 ', width: 20 },
  ]

  const TBodyData = [
    { select: false, title: '작품1',author:'김테스트' ,tags: ['태그','태그','태그'], pictureInfo: '캔버스에 유채화', price: '10,000',productId: 1 },
    { select: false, title: '작품2',author:'김테스트' ,tags: ['태그','태그','태그'], pictureInfo: '캔버스에 유채화', price: '10,000',productId: 2 },
    { select: false, title: '작품3',author:'김테스트' ,tags: ['태그','태그','태그'], pictureInfo: '캔버스에 유채화', price: '10,000',productId: 3 },
    { select: false, title: '작품4',author:'김테스트' ,tags: ['태그','태그','태그'], pictureInfo: '캔버스에 유채화', price: '10,000',productId: 4 },
    { select: false, title: '작품5',author:'김테스트' ,tags: ['태그','태그','태그'], pictureInfo: '캔버스에 유채화', price: '10,000',productId: 5 },
    { select: false, title: '작품6',author:'김테스트' ,tags: ['태그','태그','태그'], pictureInfo: '캔버스에 유채화', price: '10,000',productId: 6 },
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

  const navigated = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, item: TProductBodyType, index: number) => {
    const current = e.target as HTMLElement
    const selectCurrent = selectRefs.current[index]

    if (current.contains(selectCurrent)) {
      return
    } else {
      const path = item.productId
      navigate(`${location.pathname}/${path}`)
    }
  }

  return (
    <Wrapper title="작품관리">
      <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
        <Search date={'등록일정'} filter={filter} state={state} setState={setState} handler={() => console.log('조회 버튼 클릭')} />
        <div className="flex flex-col items-center justify-between gap-4 w-full h-[90%]">
          <Button
            name="작품 등록"
            customType={type.fill}
            addClass="self-start"
            onClick={() => navigate('/product/edit')}
          />
          <section className="flex flex-col items-center justify-between gap-3 w-full 2xl:h-[92%] h-[90%] p-5 rounded-2xl bg-white shadow-light">
            <TInteraction
              search={{ name: '검색 건수', value: TBodyData.length }}
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
                        id={String(item.productId)}
                        defaultChecked={item.select}
                        onChange={() => selectedItem(item)}
                        selectRef={(element: any) => (selectRefs.current[index] = element)}
                      />
                      <Td value={index + 1} />
                      <Td value={item.title} />
                      <Td value={item.author} />
                      <Td value={item.tags} />
                      <Td
                        value={item.pictureInfo}
                      />
                      <Td value={item.price} />
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

export default ProductPage
