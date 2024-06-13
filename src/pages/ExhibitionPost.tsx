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
import { ExhibitionInfoType } from './ExhibitionDetail'
import Modal from '../components/@common/ModalBox'
import { IoSearch } from 'react-icons/io5'
import ExhibitonProduct from '../components/ExhibitionProduct'

export interface ProductProps {
  index: number
  item: ProductType
}

export interface ProductType {
  num: number
  code: string
  title: string
  desc: string
  image: string
  createAt: string
  updateAt: string
}

const productData: ProductType[] = [
  {
    num: 1,
    code: '000000',
    title: '달콤한 머핀이 잔뜩 올라간 케이크',
    desc: '작품 설명입니다~',
    image: 'https://cdn.crowdpic.net/detail-thumb/thumb_d_2F583E5543F7E19139C6FCFFBF9607A6.jpg',
    createAt: '2024-04-20',
    updateAt: '',
  },
  {
    num: 2,
    code: '000000',
    title: '달콤한 머핀이 잔뜩 올라간 케이크',
    desc: '작품 설명입니다~',
    image: 'https://i.pinimg.com/236x/9e/85/dc/9e85dcf648f3bc3b37b35ad9314c0795.jpg',
    createAt: '2024-04-20',
    updateAt: '',
  },
  {
    num: 3,
    code: '000000',
    title: '달콤한 머핀이 잔뜩 올라간 케이크',
    desc: '작품 설명입니다~',
    image: 'https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_960_720.png',
    createAt: '2024-04-20',
    updateAt: '',
  },
]

const ExhibitionPostPage = () => {
  const [exhibitionInfo, setExhibitionInfo] = useState<ExhibitionInfoType>()
  const [productList, setProductList] = useState<ProductType[]>(productData)
  const [selectedProductList, setSelectedProductList] = useState<ProductType[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [height, setHeight] = useState<number>()
  const [confirm, setConfirm] = useState<boolean>(false)
  const imageRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const selectedProduct = (item: ProductType) => {
    const findIdx = selectedProductList.findIndex((ele) => ele.num === item.num)
    if (findIdx === -1) {
      setSelectedProductList([...selectedProductList, item])
    } else {
      const deleteSelected = selectedProductList.filter((el, index) => index !== findIdx)
      setSelectedProductList(deleteSelected)
    }
  }

  const searchedProduct = (value: string) => {
    if (value === '') {
      setProductList(productData)
    } else {
      const result = productList.filter((item) => item.code.includes(value) || item.title.includes(value))
      setProductList(result)
    }
  }

  const saveExhibition = () => {
    console.log('전시 등록 ')
    navigate('/exhibition')
  }

  const memoizedProducts = useMemo(() => {
    return productList.map((item, index) => (
      <ExhibitonProduct
        key={item.num}
        item={item}
        index={index}
        selectedProduct={selectedProduct}
        isSelected={selectedProductList.some((selectedItem) => selectedItem.num === item.num)}
      />
    ))
  }, [productList, selectedProductList, selectedProduct])

  useEffect(() => {
    setHeight(wrapRef?.current?.clientHeight)
  }, [wrapRef?.current])

  useEffect(() => {
    setExhibitionInfo({
      title: '',
      subHeading: '',
      startDate: '',
      endDate: '',
      location: '',
      status: '',
      poster: '',
      products: [],
    })
  }, [])

  console.log(exhibitionInfo)

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
                values={['전시 예정', '전시중', '전시 종료']}
                onChange={(e) => {
                  setExhibitionInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, status: e.target.value as 'prev' | 'current' | 'done' }
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
                  <span className="text-sm">전체 {productList.length}</span>
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
                  className={cn(
                    'grid grid-cols-4 gap-0.5 relative w-full 2xl:h-[470px] h-[410px] overflow-auto pt-0 rounded-lg bg-gray-50 border border-default border-opacity-5',
                  )}
                  style={{ gridTemplateRows: `repeat(${Math.ceil(productList.length / 4)}, 250px)` }}
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
              <Button addClass="w-[100px]" name="저장" customType={type.fill} onClick={() => setConfirm(true)} />
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
                <ImageInput setImage={setImage} setPreviewImg={setPreviewImage} imageRef={imageRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {confirm && (
        <Modal setState={setConfirm} value={{ yes: '등록', no: '취소' }} handler={() => saveExhibition()}>
          <p>전시를 등록하시겠어요?</p>
        </Modal>
      )}
    </Wrapper>
  )
}

export default ExhibitionPostPage
