import { useEffect, useMemo, useRef, useState } from 'react'
import Wrapper from '../components/@common/layout/Wrapper'
import Rows from '../components/@common/row/Rows'
import { useLocation, useNavigate } from 'react-router-dom'
import Row from '../components/@common/row/Row'
import Input from '../components/@common/row/Input'
import Button, { type } from '../components/@common/atom/Button'
import cn from '../lib/tailwindUtil'
import Title from '../components/@common/atom/Title'
import { customDefaultImg, dateFormat } from '../utils/util'
import RadioInput from '../components/@common/row/RadioInput'
import Table, { THeadType } from '../components/@common/table/Table'
import Tr from '../components/@common/table/Tr'
import Td from '../components/@common/table/Td'
import { CSVLink } from 'react-csv'
import ImageInput from '../components/@common/row/ImageInput'
import { IoSearch } from 'react-icons/io5'
import useExhibitionDetail from '../hooks/api/exhibition/useExhibitionDetail'
import ExhibitonProduct from '../components/exhibition/ExhibitionProduct'
import usePutExhibition from '../hooks/api/exhibition/usePutExhibition'
import useDeleteExhibition from '../hooks/api/exhibition/useDeleteExhibition'
import ModalPortal from '../components/@common/modal/ModalPortal'
import ConfirmModal from '../components/@common/modal/ConfirmModal'
import useProductList from '../hooks/api/product/useProductList'

export interface ExhibitionInfoType {
  exhibitionId: number
  title: string
  subHeading: string
  startDate: string
  endDate: string
  location: string
  status: string
  poster: string
  products?: ProductInfoType[]
  file: File | null
}

export interface ProductInfoType {
  productId: number
  title: string
  picture: string
  basicView: number
  likeCount: number
  orderCount: number
  qrView: number
}

const ExhibitionDetailPage = () => {
  const [originInfo, setOriginInfo] = useState<ExhibitionInfoType>({
    exhibitionId: 0,
    title: '',
    subHeading: '',
    startDate: '',
    endDate: '',
    location: '',
    status: '',
    poster: '',
    file: null,
  })
  const [exhibitionInfo, setExhibitionInfo] = useState<ExhibitionInfoType>({
    exhibitionId: 0,
    title: '',
    subHeading: '',
    startDate: '',
    endDate: '',
    location: '',
    status: '',
    poster: '',
    file: null,
  })
  const [productList, setProductList] = useState<ProductInfoType[]>()
  const [selectedProductList, setSelectedProductList] = useState<number[]>([])
  const [originList, setOriginList] = useState<ProductInfoType[]>([])
  const [edit, setEdit] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [height, setHeight] = useState<number>()
  const [isShow, setIsShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [modalType, setModalType] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation()
  const today = new Date()
  const csvRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLInputElement>(null)
  const path = location.pathname.split('/')[location.pathname.split('/').length - 1]

  const THeadData: THeadType[] = [
    { name: '작품코드', width: 18 },
    { name: '제목', width: 30 },
    { name: '회원 조회수', width: 13 },
    { name: 'QR 조회수', width: 13 },
    { name: '좋아요 수', width: 13 },
    { name: '구매신청 수', width: 13 },
  ]

  const header = [
    { label: '작품 코드', key: 'productId' },
    { label: '제목', key: 'title' },
    { label: '회원 조회수', key: 'basicView' },
    { label: 'QR 조회수', key: 'qrView' },
    { label: '좋아요 수', key: 'likeCount' },
    { label: '구매신청 수', key: 'orderCount' },
  ]

  const selectedProduct = (item: ProductInfoType) => {
    const findIdx = selectedProductList.findIndex((ele) => ele === item.productId)
    if (findIdx === -1) {
      setSelectedProductList([...selectedProductList, item.productId])
    } else {
      const deleteSelected = selectedProductList.filter((el, index) => index !== findIdx)
      setSelectedProductList(deleteSelected)
    }
  }

  const searchedProduct = (value: string) => {
    if (value === '') {
      setProductListCustom(originList)
    } else {
      const result = productList?.filter((item) => String(item.productId) === value || item.title.includes(value))
      setProductList(result)
    }
  }

  const { refetch: getExhibitionDetail } = useExhibitionDetail({
    exhibitionId: Number(path),
    enabled: false,
    onSuccess: (data) => {
      console.log(data)
      setOriginInfo(data)
      setExhibitionInfo(data)
      setProductList(data.products)

      const productList = data.products.map((item: ProductInfoType) => {
        return item.productId
      })

      setSelectedProductList(productList)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { onPutExhibition } = usePutExhibition({
    params: { ...exhibitionInfo, products: selectedProductList },
    onSuccess: (res) => {
      console.log('전시 수정 완료')
      console.log(res)
      getExhibitionDetail()
      setEdit(false)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { onDeleteExhibiton } = useDeleteExhibition({
    onSuccess: (res) => {
      console.log(res)
      navigate('/exhibition')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { refetch: getProductList } = useProductList({
    enabled: false,
    onSuccess: (data) => {
      setOriginList(data.data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const setProductListCustom = (targetList: ProductInfoType[]) => {
    const sortedProductList = targetList?.sort((a, b) => {
      const aIncluded = selectedProductList.includes(a.productId)
      const bIncluded = selectedProductList.includes(b.productId)

      if (aIncluded && !bIncluded) return -1
      if (!aIncluded && bIncluded) return 1
      return 0
    })

    setProductList(sortedProductList)
  }

  const memoizedProducts = useMemo(() => {
    return productList?.map((item, index) => (
      <ExhibitonProduct
        key={item.productId}
        item={item}
        index={index}
        selectedProduct={selectedProduct}
        isSelected={selectedProductList.includes(item.productId)}
      />
    ))
  }, [productList, selectedProductList, selectedProduct])

  useEffect(() => {
    getExhibitionDetail()
    getProductList()
  }, [path])

  useEffect(() => {
    setHeight(wrapRef?.current?.clientHeight)
  }, [wrapRef?.current])

  return (
    <Wrapper title="전시 상세 정보">
      <div className="flex w-full h-full overflow-auto pr-2" ref={wrapRef}>
        <div className="flex items-start justify-between gap-3 w-full 2xl:h-[1000px] h-[850px]">
          <Rows
            title={edit ? '전시 정보 수정' : '전시 정보'}
            addClass={cn('2xl:h-[1000px] h-[850px] w-[66%]', edit ? 'border-main-dark border-opacity-15' : '')}
          >
            <Row>
              <Input
                required
                type="text"
                title="제목"
                value={exhibitionInfo?.title}
                placeholder="전시 제목을 입력해 주세요."
                disabled={edit ? false : true}
                onChange={(e) =>
                  setExhibitionInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, title: e.target.value }
                  })
                }
              />
              <Input
                required
                type="text"
                title="부제목"
                value={exhibitionInfo?.subHeading}
                placeholder={edit ? '부제목을 입력해 주세요.' : '아직 등록된 부제목이 없어요.'}
                disabled={edit ? false : true}
                onChange={(e) =>
                  setExhibitionInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, subTitle: e.target.value }
                  })
                }
              />
            </Row>
            <Row>
              <Input
                required
                type="date"
                title="시작 일자"
                value={exhibitionInfo?.startDate}
                placeholder=""
                disabled={edit ? false : true}
                onChange={(e) =>
                  setExhibitionInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, startDate: e.target.value }
                  })
                }
              />
              <Input
                required
                type="date"
                title="종료 일자"
                value={exhibitionInfo?.endDate}
                placeholder=""
                disabled={edit ? false : true}
                onChange={(e) =>
                  setExhibitionInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, endDate: e.target.value }
                  })
                }
              />
            </Row>
            <Row>
              <Input
                required
                type="text"
                title="전시 장소"
                value={exhibitionInfo?.location}
                placeholder={edit ? '전시 장소를 입력해 주세요.' : '아직 등록된 전시 장소가 없어요.'}
                disabled={edit ? false : true}
                onChange={(e) =>
                  setExhibitionInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, location: e.target.value }
                  })
                }
              />
              <RadioInput
                required
                type="radio"
                name="statue"
                title="전시 상태"
                value={
                  exhibitionInfo?.status === '전시 예정' || exhibitionInfo?.status === 'prev'
                    ? 'prev'
                    : exhibitionInfo?.status === '전시중' || exhibitionInfo?.status === 'current'
                      ? 'current'
                      : exhibitionInfo?.status === '전시 종료' || exhibitionInfo?.status === 'end'
                        ? 'end'
                        : ''
                }
                values={['prev', 'current', 'end']}
                disabled={edit ? false : true}
                onChange={(e) => {
                  setExhibitionInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, status: e.target.value }
                  })
                }}
              />
            </Row>
            {edit ? (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3 pt-4">
                  <h2 className="text-xl font-semibold">작품</h2>
                  <p>
                    <span className="text-sm">선택한 작품 {selectedProductList.length}</span>
                    <span className="text-sm">{' / '}</span>
                    <span className="text-sm">전체 {originList?.length}</span>
                  </p>
                  <div className="flex items-center gap-3 ml-auto w-[30%] h-8 px-3 border rounded-md text-sm overflow-hidden">
                    <IoSearch className="w-5 h-5 text-gray-500" />
                    <input
                      className="relative -top-[1px] w-full h-full"
                      placeholder="작품 코드 및 제목을 검색할 수 있어요."
                      onChange={(e) => {
                        searchedProduct(e.target.value)
                      }}
                    />
                  </div>
                </div>
                {productList?.length !== 0 ? (
                  <div
                    key={1}
                    className={cn(
                      'grid grid-cols-4 gap-0.5 relative w-full 2xl:h-[470px] h-[410px] overflow-auto pt-0 rounded-lg bg-gray-50 border border-gray-200',
                    )}
                    style={{
                      gridTemplateRows: `repeat(${Math.ceil(productList ? productList.length / 4 : 0)}, 250px)`,
                    }}
                  >
                    {memoizedProducts}
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full 2xl:h-[470px] h-[410px]">
                    등록된 작품이 없어요.
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3 pt-4">
                  <h2 className="text-xl font-semibold">작품</h2>
                  <span className="text-sm">전체 {exhibitionInfo?.products?.length}건</span>
                  <Button
                    addClass="h-8 py-0.5 px-2 text-sm ml-auto rounded-md"
                    name="데이터 다운로드"
                    customType={type.empty}
                    onClick={() => {
                      console.log('데이터 다운로드')
                      csvRef?.current?.link.click()
                    }}
                  />
                </div>
                <div className="relative w-full 2xl:h-[470px] h-[410px] overflow-auto pt-0 rounded-lg bg-gray-50 border border-gray-200">
                  <Table thead={THeadData} index={false} theadClass="h-11">
                    {exhibitionInfo?.products?.map((item, index) => {
                      return (
                        <Tr key={index} addClass="h-10 cursor-default">
                          <Td value={item.productId} />
                          <Td value={item.title} addClass="ellipsis text-center" />
                          <Td value={item.basicView} />
                          <Td value={item.qrView} />
                          <Td value={item.likeCount} />
                          <Td value={item.orderCount} />
                        </Tr>
                      )
                    })}
                  </Table>
                </div>
              </div>
            )}

            <div className="relative justify-self-end flex items-center justify-center gap-4 w-full mt-auto">
              <Button
                addClass="w-[100px]"
                name={edit ? '취소' : '목록'}
                customType={type.white}
                onClick={() => {
                  if (edit) {
                    setEdit(false)
                    setExhibitionInfo(originInfo)
                  } else {
                    navigate('/exhibition')
                  }
                }}
              />
              <Button
                addClass="w-[100px]"
                name={edit ? '저장' : '수정'}
                customType={type.fill}
                onClick={() => {
                  if (edit) {
                    setIsShow(true)
                    setMessage('수정된 내용을 저장하시겠어요?')
                    setModalType('edit')
                    console.log('저장 버튼 클릭')
                  } else {
                    console.log('수정 버튼 클릭')
                    setEdit(true)
                    setProductListCustom(originList)
                  }
                }}
              />
              <Button
                addClass="absolute top-1/2 left-0 -translate-y-1/2"
                name="전시 삭제"
                customType={type.empty}
                onClick={() => {
                  console.log('삭제 버튼 클릭')
                  setIsShow(true)
                  setMessage('전시를 삭제하시겠어요?')
                  setModalType('delete')
                }}
              />
              <CSVLink
                data={exhibitionInfo && exhibitionInfo?.products ? exhibitionInfo?.products : ''}
                headers={header}
                filename={`${dateFormat(today)}.csv`}
                className="hidden"
                ref={csvRef}
              />
            </div>
          </Rows>
          <div
            className={cn(
              'sticky top-0 flex flex-col justify-between w-[33%] p-4 rounded-2xl bg-white shadow-light border border-transparent',
              edit && 'border-main-dark border-opacity-15',
            )}
            style={{ height: height }}
          >
            <div className="flex flex-col justify-between gap-2.5 w-full h-full">
              <Title value="전시 포스터" size="large" />
              <div
                className={cn(
                  'relative flex items-center justify-center w-full h-[96%] bg-main-medium bg-opacity-20 rounded-xl overflow-hidden',
                  edit && 'cursor-pointer',
                )}
                onClick={() => imageRef.current?.click()}
              >
                <img
                  className={cn(
                    'object-contain',
                    previewImage ? 'w-full h-full' : exhibitionInfo ? 'w-full h-full' : 'w-40 h-40',
                  )}
                  src={customDefaultImg(previewImage ? previewImage : exhibitionInfo ? exhibitionInfo?.poster : '')}
                />
                {edit && <ImageInput setFile={setFile} setPreviewImg={setPreviewImage} imageRef={imageRef} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalPortal>
        {isShow && (
          <ConfirmModal
            setState={setIsShow}
            value={{ yes: modalType === 'delete' ? '삭제' : modalType === 'edit' ? '저장' : '', no: '취소' }}
            handler={() => {
              modalType === 'delete'
                ? onDeleteExhibiton(String(exhibitionInfo.exhibitionId))
                : modalType === 'edit'
                  ? onPutExhibition()
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

export default ExhibitionDetailPage
