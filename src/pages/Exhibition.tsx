import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button, { type } from '../components/@common/atom/Button'
import Search from '../components/@common/atom/Search'
import Wrapper from '../components/@common/layout/Wrapper'
import TInteraction from '../components/@common/table/TInteraction'
import Table, { THeadType } from '../components/@common/table/Table'
import Tr from '../components/@common/table/Tr'
import Td from '../components/@common/table/Td'
import Pagination from '../components/@common/pagination/Pagination'
import Toggle from '../components/@common/atom/Toggle'
import useExhibitionList from '../hooks/api/exhibition/useExhibitionList'
import useChangeDisplayStatus from '../hooks/api/exhibition/useChangeDisplayStatus'
import useDeleteExhibition from '../hooks/api/exhibition/useDeleteExhibition'
import ModalPortal from '../components/@common/modal/ModalPortal'
import ConfirmModal from '../components/@common/modal/ConfirmModal'

export interface ExhibitionType {
  select: false
  exhibitionId: number
  title: string
  subHeading: string
  startDate: string
  endDate: string
  location: string
  status: 'prev' | 'current' | 'end'
  isDisplay: boolean
}

const ExhibitionPage = () => {
  const [originList, setOriginList] = useState<ExhibitionType[]>([])
  const [searchedList, setSearchedList] = useState<ExhibitionType[]>([])
  const [selectedList, setSelectedList] = useState<ExhibitionType[]>([])
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [text, setText] = useState<string>()
  const [limit, setLimit] = useState<string>('title')
  const [isStatus, setIsStatus] = useState<'all' | 'prev' | 'current' | 'end'>('all')
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [modalType, setModalType] = useState<string>('')
  const selectRefs = useRef<any[]>([])
  const toggleRefs = useRef<any[]>([])
  const navigate = useNavigate()

  const filter = [
    { name: '전시명', type: 'title' },
    { name: '작가명', type: 'artist' },
  ]
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
    { name: '전시명', width: 15 },
    { name: '부제목', width: 20 },
    { name: '시작 일자', width: 13.75 },
    { name: '종료 일자', width: 13.75 },
    { name: '장소', width: 15 },
    { name: '진행 상태', width: 7.5 },
    { name: '노출 여부', width: 7.5 },
  ]

  const selectedItem = (item: ExhibitionType) => {
    const index = selectedList.findIndex((select) => select.exhibitionId === item.exhibitionId)

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
      const path = item.exhibitionId
      navigate(`${location.pathname}/${path}`)
    }
  }

  const { refetch: refetchReset } = useExhibitionList({
    page: page,
    enabled: false,
    onSuccess: (data) => {
      console.log(data)
      setOriginList(data.data)
      setSearchedList(data.data)
      setStartDate(undefined)
      setEndDate(undefined)
      setText(undefined)
      setLimit('title')
      setIsStatus('all')
      setTotalCount(data.totalCount)
      setPage(data.pageIndex)
      setTotalPages(data.totalPage)
    },
    onError: (error) => {
      console.log(error)
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

  const { refetch: getExhibitionList } = useExhibitionList({
    startDate,
    endDate,
    text,
    limit,
    page,
    enabled: false,
    onSuccess: (data) => {
      setOriginList(data.data)
      setSearchedList(data.data)
      setTotalCount(data.totalCount)
      setPage(data.pageIndex)
      setTotalPages(data.totalPage)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { onChangeDisplayStatus } = useChangeDisplayStatus({
    onSuccess: (res) => {
      console.log(res)
      getExhibitionList()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { onDeleteExhibiton } = useDeleteExhibition({
    onSuccess: (res) => {
      console.log(res)
      getExhibitionList()
      setSelectedList([])
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const getFiltered = useCallback(() => {
    const filterList = originList.filter((item) => (isStatus !== 'all' ? item.status === isStatus : item))
    setSearchedList(filterList)
  }, [isStatus])

  useEffect(() => {
    getExhibitionList()
    setIsStatus('all')
  }, [])

  useEffect(() => {
    if (selectedList === undefined) return
    getFiltered()
  }, [isStatus])

  console.log(originList)

  return (
    <Wrapper title="전시관리">
      <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
        <Search
          filter={filter}
          date="전시일자"
          state={state}
          setState={setState}
          handler={() => {
            getExhibitionList()
          }}
          resetHandler={() => {
            refetchReset()
          }}
        />
        <div className="flex flex-col items-center justify-between gap-4 w-full h-[90%]">
          <div className="flex item justify-between w-full">
            <div className="flex flex-row justify-start gap-2">
              <Button
                name="전체"
                customType={isStatus === 'all' ? type.fill : type.white}
                onClick={() => {
                  setIsStatus('all')
                }}
              />
              <Button
                name="전시 예정"
                customType={isStatus === 'prev' ? type.fill : type.white}
                onClick={() => setIsStatus('prev')}
              />
              <Button
                name="전시 중"
                customType={isStatus === 'current' ? type.fill : type.white}
                onClick={() => setIsStatus('current')}
              />
              <Button
                name="전시 종료"
                customType={isStatus === 'end' ? type.fill : type.white}
                onClick={() => setIsStatus('end')}
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
              search={{ name: '검색 건수', value: searchedList.length }}
              total={{ name: '전체', value: totalCount }}
              date={startDate && endDate ? { name: '검색일자', value: `${startDate} ~ ${endDate}` } : undefined}
            />
            <div className="flex flex-col items-center justify-between gap-2 w-full h-[83%] border-y border-default border-opacity-5">
              <Table thead={THeadData} index={false} addClass="h-[91%] relative">
                {(searchedList.length === 0 || originList.length === 0) && (
                  <div className="absolute flex items-center justify-center w-full h-full bg-gray-50">
                    전시 목록이 존재하지 않아요.
                  </div>
                )}
                {searchedList !== originList
                  ? searchedList?.map((item, index) => {
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
                          <Td value={item.exhibitionId} />
                          <Td value={item.title} addClass="ellipsis text-center" />
                          <Td value={item.subHeading} addClass="ellipsis text-center" />
                          <Td value={item.startDate} />
                          <Td value={item.endDate} />
                          <Td value={item.location} />
                          <Td>
                            {item.status === 'prev' ? '전시 예정' : item.status === 'current' ? '전시 중' : '전시 종료'}
                          </Td>
                          <Td>
                            <Toggle
                              active={item.isDisplay}
                              addClass="w-[70px] h-[36px]"
                              toggleRef={(element: any) => (toggleRefs.current[index] = element)}
                              onClick={() => onChangeDisplayStatus(item.exhibitionId, !item.isDisplay)}
                            />
                          </Td>
                        </Tr>
                      )
                    })
                  : originList?.map((item, index) => {
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
                          <Td value={item.exhibitionId} />
                          <Td value={item.title} addClass="ellipsis text-center" />
                          <Td value={item.subHeading} addClass="ellipsis text-center" />
                          <Td value={item.startDate} />
                          <Td value={item.endDate} />
                          <Td value={item.location} />
                          <Td>
                            {item.status === 'prev' ? '전시 예정' : item.status === 'current' ? '전시 중' : '전시 종료'}
                          </Td>
                          <Td>
                            <Toggle
                              active={item.isDisplay}
                              addClass="w-[70px] h-[36px]"
                              toggleRef={(element: any) => (toggleRefs.current[index] = element)}
                              onClick={() => onChangeDisplayStatus(item.exhibitionId, !item.isDisplay)}
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
                  onClick={() => {
                    setIsShow(true)
                    setMessage('선택한 전시를 삭제하시겠어요?')
                    setModalType('delete')
                  }}
                />
              </div>
            </div>
            <Pagination page={page} totalPages={totalPages} itemsPerPage={10} totalItems={totalCount} />
          </section>
        </div>
      </div>
      <ModalPortal>
        {isShow && (
          <ConfirmModal
            setState={setIsShow}
            value={{ yes: modalType === 'delete' ? '삭제' : '', no: '취소' }}
            handler={() => {
              modalType === 'delete'
                ? onDeleteExhibiton(
                    selectedList
                      .map((item) => {
                        return item.exhibitionId
                      })
                      .join(','),
                  )
                : ''
            }}
          >
            <p>{message}</p>
          </ConfirmModal>
        )}
      </ModalPortal>
    </Wrapper>
  )
}

export default ExhibitionPage
