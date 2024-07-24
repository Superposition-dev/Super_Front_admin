import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Search from '../components/@common/atom/Search'
import Wrapper from '../components/@common/layout/Wrapper'
import TInteraction from '../components/@common/table/TInteraction'
import Table from '../components/@common/table/Table'
import Tr from '../components/@common/table/Tr'
import Td from '../components/@common/table/Td'
import Button, { type } from '../components/@common/atom/Button'
import Pagination from '../components/@common/pagination/Pagination'
import useAuthorList from '../hooks/api/author/useAuthorList'
import { dateFormat } from '../utils/util'
import useDeleteAuthor from '../hooks/api/author/useDeleteAuthor'
import ModalPortal from '../components/@common/modal/ModalPortal'
import ConfirmModal from '../components/@common/modal/ConfirmModal'

export interface AuthorType {
  select: false
  instagramId: string
  name: string
  collaborationDate: string
  user: boolean
}

const AuthorPage = () => {
  const [searchedList, setSearchedList] = useState<AuthorType[]>([])
  const [selectedList, setSelectedList] = useState<AuthorType[]>([])
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [text, setText] = useState<string>()
  const [limit, setLimit] = useState<string>('all')
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const selectRefs = useRef<any[]>([])
  const navigate = useNavigate()

  const filter = [
    { name: '전체', type: 'all' },
    { name: '작가명', type: 'name' },
    { name: '작가 ID', type: 'id' },
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

  const selectedItem = (item: AuthorType) => {
    const index = selectedList.findIndex((select) => select.instagramId === item.instagramId)

    if (index === -1) {
      setSelectedList([...selectedList, item])
    } else {
      const copySelectedTableList = [...selectedList]
      copySelectedTableList.splice(index, 1)
      setSelectedList(copySelectedTableList)
    }
  }

  const navigated = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, item: AuthorType, index: number) => {
    const current = e.target as HTMLElement
    const selectCurrent = selectRefs.current[index]

    if (current.contains(selectCurrent)) {
      return
    } else {
      const path = item.instagramId
      navigate(`${location.pathname}/${path}`)
    }
  }

  const { refetch: refetchReset } = useAuthorList({
    page: page,
    enabled: false,
    onSuccess: (data) => {
      setSearchedList(data.artists)
      setStartDate(undefined)
      setEndDate(undefined)
      setText(undefined)
      setLimit('all')
      // setTotalCount(data.totalCount)
      // setPage(data.pageIndex)
      // setTotalPages(data.totalPage)
    },
    onError: (error) => {
      console.log(error)
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

  const { refetch: getAuthorList } = useAuthorList({
    startDate,
    endDate,
    text,
    limit,
    page,
    enabled: false,
    onSuccess: (data) => {
      setSearchedList(data.artists)
      // setTotalCount(data.totalCount)
      // setPage(data.pageIndex)
      // setTotalPages(data.totalPage)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { onDeleteAuthor } = useDeleteAuthor({
    onSuccess: (res) => {
      console.log(res)
      getAuthorList()
      setSelectedList([])
    },
    onError: (error) => {
      console.log(error)
    },
  })

  useEffect(() => {
    getAuthorList()
  }, [])

  return (
    <Wrapper title="작가관리">
      <div className="flex flex-col items-center justify-between gap-7 w-full h-full">
        <Search
          filter={filter}
          date="등록일자"
          state={state}
          setState={setState}
          handler={() => getAuthorList()}
          resetHandler={() => {
            refetchReset()
          }}
        />
        <div className="flex flex-col items-center justify-between gap-4 w-full h-[90%]">
          <Button
            name="작가 등록"
            customType={type.fill}
            addClass="self-end"
            onClick={() => navigate('/author/post')}
          />
          <section className="flex flex-col items-center justify-between gap-3 w-full 2xl:h-[92%] h-[90%] p-5 rounded-2xl bg-white shadow-light">
            <TInteraction
              search={{ name: '검색 건수', value: searchedList.length }}
              total={{ name: '전체', value: totalCount }}
              date={startDate && endDate ? { name: '검색일자', value: `${startDate} ~ ${endDate}` } : undefined}
            />
            <div className="flex flex-col items-center justify-between gap-2 w-full h-[83%] border-y border-default border-opacity-5">
              <Table thead={THeadData} tbody={TBodyData} index={false} addClass="h-[91%] relative">
                {searchedList.length === 0 && (
                  <div className="absolute flex items-center justify-center w-full h-full bg-gray-50">
                    작가 목록이 존재하지 않아요.
                  </div>
                )}
                {searchedList?.map((item, index) => {
                  return (
                    <Tr
                      key={index}
                      onClick={(e) => {
                        navigated(e, item, index)
                      }}
                    >
                      <Td
                        type="checkbox"
                        id={String(item.instagramId)}
                        defaultChecked={item.select}
                        onChange={() => selectedItem(item)}
                        selectRef={(element: any) => (selectRefs.current[index] = element)}
                      />
                      <Td value={index + 1} />
                      <Td value={item.name} />
                      <Td value={item.instagramId} />
                      <Td
                        value={item.user ? 'Y' : 'N'}
                        addClass={item.user ? 'text-main-medium font-bold' : 'text-default text-opacity-30'}
                      />
                      <Td value={dateFormat(new Date(item.collaborationDate))} />
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
                    setMessage('선택한 작가를 삭제하시겠어요?')
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
            value={{ yes: '삭제', no: '취소' }}
            handler={() => {
              onDeleteAuthor(
                selectedList.map((item) => {
                  return item.instagramId
                }),
              )
            }}
          >
            <p>{message}</p>
          </ConfirmModal>
        )}
      </ModalPortal>
    </Wrapper>
  )
}

export default AuthorPage
