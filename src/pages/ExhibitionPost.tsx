import { useEffect, useMemo, useRef, useState } from 'react'
import Wrapper from '../components/@common/layout/Wrapper'
import Rows from '../components/@common/row/Rows'
import { useNavigate } from 'react-router-dom'
import Row from '../components/@common/row/Row'
import Input from '../components/@common/row/Input'
import Button, { type } from '../components/@common/atom/Button'
import cn from '../lib/tailwindUtil'
import Title from '../components/@common/atom/Title'
import { customDefaultImg } from '../utils/util'
import RadioInput from '../components/@common/row/RadioInput'
import ImageInput from '../components/@common/row/ImageInput'
import ConfirmModal from '../components/@common/modal/ConfirmModal'
import { IoSearch } from 'react-icons/io5'
import ExhibitonProduct from '../components/exhibition/ExhibitionProduct'
import usePostExhibition from '../hooks/api/exhibition/usePostExhibition'
import useProductList from '../hooks/api/product/useProductList'
import ModalPortal from '../components/@common/modal/ModalPortal'

export interface ProductProps {
  index: number
  item: ProductInfoType
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

export interface ExhibitionPostInfoType {
  exhibitionId?: number
  title: string
  subHeading: string
  startDate: string
  endDate: string
  location: string
  status: string
  poster: string
  file: File | null
}

const productData: ProductInfoType[] = [
  {
    productId: 1,
    title: '달콤한 머핀이 잔뜩 올라간 케이크',
    picture: 'https://cdn.crowdpic.net/detail-thumb/thumb_d_2F583E5543F7E19139C6FCFFBF9607A6.jpg',
    basicView: 0,
    qrView: 0,
    likeCount: 0,
    orderCount: 0,
  },
  {
    productId: 2,
    title: '달콤한 머핀이 잔뜩 올라간 케이크',
    picture: 'https://i.pinimg.com/236x/9e/85/dc/9e85dcf648f3bc3b37b35ad9314c0795.jpg',
    basicView: 0,
    qrView: 0,
    likeCount: 0,
    orderCount: 0,
  },
  {
    productId: 3,
    title: '달콤한 머핀이 잔뜩 올라간 케이크',
    picture: 'https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_960_720.png',
    basicView: 0,
    qrView: 0,
    likeCount: 0,
    orderCount: 0,
  },
]

const ExhibitionPostPage = () => {
  const [exhibitionInfo, setExhibitionInfo] = useState<ExhibitionPostInfoType>({
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
  const [originProductList, setOriginProductList] = useState<ProductInfoType[]>()
  const [selectedProductList, setSelectedProductList] = useState<number[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [height, setHeight] = useState<number>()
  const [confirm, setConfirm] = useState<boolean>(false)
  const imageRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

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
      setProductList(originProductList)
    } else {
      const result = originProductList?.filter((item) => String(item.productId) === value || item.title.includes(value))
      setProductList(result)
    }
  }

  const { onPostExhibition } = usePostExhibition({
    params: { ...exhibitionInfo, products: selectedProductList },
    onSuccess: (res) => {
      console.log(res)
      console.log('전시 등록 완료')
      navigate('/exhibition')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { refetch: getProductList } = useProductList({
    enabled: false,
    onSuccess: (data) => {
      setProductList(data.data)
      setOriginProductList(data.data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const memoizedProducts = useMemo(() => {
    return productList?.map((item, index) => (
      <ExhibitonProduct
        key={item.productId}
        item={item}
        index={index}
        selectedProduct={selectedProduct}
        isSelected={selectedProductList.some((selectedItem) => selectedItem === item.productId)}
      />
    ))
  }, [productList, selectedProductList, selectedProduct])

  useEffect(() => {
    getProductList()
  }, [])

  useEffect(() => {
    setHeight(wrapRef?.current?.clientHeight)
  }, [wrapRef?.current])

  useEffect(() => {
    setExhibitionInfo((prev) => {
      if (!prev) {
        return prev
      }
      return { ...prev, file: file }
    })
  }, [file])

  return (
    <Wrapper title="전시 등록">
      <div className="flex w-full h-full overflow-auto pr-2" ref={wrapRef}>
        <div className="flex items-start justify-between gap-3 w-full 2xl:h-[1000px] h-[850px]">
          <Rows
            title="전시 정보 등록"
            addClass={cn('2xl:h-[1000px] h-[850px] w-[66%]', 'border-main-dark border-opacity-15')}
          >
            <Row>
              <Input
                required
                type="text"
                title="제목"
                value={exhibitionInfo?.title}
                placeholder="전시 제목을 입력해 주세요."
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
                placeholder="부제목을 입력해 주세요."
                onChange={(e) =>
                  setExhibitionInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, subHeading: e.target.value }
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
                placeholder="전시 장소를 입력해 주세요."
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
                value={exhibitionInfo?.status}
                values={['prev', 'current', 'end']}
                onChange={(e) => {
                  setExhibitionInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return {
                      ...prev,
                      status: e.target.value,
                    }
                  })
                }}
              />
            </Row>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-3 pt-4">
                <h2 className="text-xl font-semibold">작품</h2>
                <p>
                  <span className="text-sm">선택한 작품 {selectedProductList.length}</span>
                  <span className="text-sm">{' / '}</span>
                  <span className="text-sm">전체 {originProductList?.length}</span>
                </p>
                <div className="flex items-center gap-3 ml-auto w-[30%] h-8 px-3 border rounded-md text-sm overflow-hidden">
                  <IoSearch className="w-5 h-5 text-gray-500" />
                  <input
                    className="relative -top-[1px] w-full h-full"
                    placeholder="작품 번호 및 제목을 검색할 수 있어요."
                    onChange={(e) => {
                      searchedProduct(e.target.value)
                    }}
                  />
                </div>
              </div>
              {productList?.length !== 0 ? (
                <div
                  className={cn(
                    'grid grid-cols-4 gap-0.5 relative w-full 2xl:h-[470px] h-[410px] overflow-auto pt-0 rounded-lg bg-gray-50 border border-default border-opacity-5',
                  )}
                  style={{ gridTemplateRows: `repeat(${Math.ceil(productList ? productList?.length / 4 : 0)}, 250px)` }}
                >
                  {memoizedProducts}
                </div>
              ) : (
                <div className="flex items-center justify-center w-full 2xl:h-[470px] h-[410px]">
                  등록된 작품이 없어요.
                </div>
              )}
            </div>
            <div className="relative justify-self-end flex items-center justify-center gap-4 w-full mt-auto">
              <Button
                addClass="w-[100px]"
                name="취소"
                customType={type.white}
                onClick={() => {
                  navigate('/exhibition')
                }}
              />
              <Button addClass="w-[100px]" name="등록" customType={type.fill} onClick={() => setConfirm(true)} />
            </div>
          </Rows>
          <div
            className={cn(
              'sticky top-0 flex flex-col justify-between w-[33%] p-4 rounded-2xl bg-white shadow-light border border-transparent',
              'border-main-dark border-opacity-15',
            )}
            style={{ height: height }}
          >
            <div className="flex flex-col justify-between gap-2.5 w-full h-full">
              <Title value="전시 포스터" size="large" />
              <div
                className={cn(
                  'relative flex items-center justify-center w-full h-[96%] bg-main-medium bg-opacity-20 rounded-xl overflow-hidden',
                  'cursor-pointer',
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
                <ImageInput setFile={setFile} setPreviewImg={setPreviewImage} imageRef={imageRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {confirm && (
        <ModalPortal>
          <ConfirmModal
            setState={setConfirm}
            value={{ yes: '등록', no: '취소' }}
            handler={() => exhibitionInfo && onPostExhibition()}
          >
            <p>전시를 등록하시겠어요?</p>
          </ConfirmModal>
        </ModalPortal>
      )}
    </Wrapper>
  )
}

export default ExhibitionPostPage
