import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button, { type } from '../components/@common/atom/Button'
import Wrapper from '../components/@common/layout/Wrapper'
import Input from '../components/@common/row/Input'
import Row from '../components/@common/row/Row'
import Rows from '../components/@common/row/Rows'
import Textarea from '../components/@common/row/Textarea'
import UserType from '../components/@common/UserType'
import Title from '../components/@common/atom/Title'
import Label from '../components/@common/atom/Label'
import { customDefaultImg, dateFormat } from '../utils/util'
import { IoIosArrowForward } from 'react-icons/io'
import cn from '../lib/tailwindUtil'
import ImageInput from '../components/@common/row/ImageInput'
import useAuthorDetail from '../hooks/api/author/useAuthorDetail'
import useProductList from '../hooks/api/product/useProductList'

export interface AuthorInfoType {
  instaId: string
  name: string
  message: string | null
  introduce: string | null
  userAccount: string | null
  user: boolean
  image: string
  collaborationDate: string
}

export interface ProductInfoType {
  productId: number
  title: string
  artistName: string
  description: string
  picture: string
  basicView: number
  likeCount: number
  orderCount: number
  qrView: number
  tags: { tag_id: number; name: string }[]
}

const AuthorDetailPage = () => {
  const [originInfo, setOriginInfo] = useState<AuthorInfoType>()
  const [authorInfo, setAuthorInfo] = useState<AuthorInfoType>()
  const [productList, setProductList] = useState<ProductInfoType[]>()
  const [edit, setEdit] = useState<boolean>(false)
  const [registed, setRegisted] = useState<boolean>()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [height, setHeight] = useState<number>()
  const navigate = useNavigate()
  const imageRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const wrapRef = useRef<HTMLInputElement>(null)
  const path = location.pathname.split('/')[location.pathname.split('/').length - 1]

  const { refetch: getAuthorDetail } = useAuthorDetail({
    id: path,
    enabled: false,
    onSuccess: (data) => {
      setOriginInfo(data)
      setAuthorInfo(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const { refetch: getProductList } = useProductList({
    limit: 'artist',
    text: authorInfo?.name,
    enabled: false,
    onSuccess: (data) => {
      setProductList(data.data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  useEffect(() => {
    getAuthorDetail()
  }, [])

  useEffect(() => {
    if (authorInfo === undefined) return
    getProductList()
  }, [authorInfo])

  useEffect(() => {
    setHeight(wrapRef?.current?.clientHeight)
  }, [wrapRef?.current])

  return (
    <Wrapper title="작가 상세 정보">
      <div className="flex flex-col items-center gap-7 w-full h-full overflow-auto pr-2" ref={wrapRef}>
        <UserType
          general={!authorInfo?.user}
          list={['작가', '회원 + 작가']}
          addClass={`self-start ${edit ? 'border-main-dark border-opacity-15' : ''}`}
          onGeneral={() => {
            edit &&
              setAuthorInfo((prev) => {
                if (!prev) {
                  return prev
                }
                return { ...prev, user: false }
              })
          }}
          onNotGeneral={() => {
            edit &&
              setAuthorInfo((prev) => {
                if (!prev) {
                  return prev
                }
                return { ...prev, user: true }
              })
          }}
        />
        <div className="flex items-start justify-between gap-3 w-full 2xl:h-[900px] h-[800px]">
          <Rows
            title={edit ? '작가 정보 수정' : '작가 정보'}
            addClass={cn('2xl:h-[900px] h-[800px]', edit ? 'border-main-dark border-opacity-15' : '')}
          >
            <Row>
              <Input
                required
                type="text"
                title="작가명"
                value={authorInfo?.name}
                placeholder="작가명을 입력해 주세요."
                disabled={edit ? false : true}
                onChange={(e) =>
                  setAuthorInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, name: e.target.value }
                  })
                }
              />
              <Input
                required
                type="date"
                title="작가 등록일자"
                value={authorInfo?.collaborationDate ? dateFormat(new Date(authorInfo?.collaborationDate)) : ''}
                disabled
                constant={edit && true}
              />
            </Row>
            <Row>
              <Input
                type="text"
                title="카카오 계정"
                value={authorInfo?.userAccount ? authorInfo?.userAccount : ''}
                placeholder={
                  edit ? '작가와 연동할 회원의 계정을 입력해 주세요.' : '아직 작가님과 연동한 계정이 없어요.'
                }
                disabled={edit ? false : true}
                onChange={(e) =>
                  setAuthorInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, userAccount: e.target.value }
                  })
                }
                button={
                  edit
                    ? registed
                      ? {
                          title: '삭제',
                          onClick: () => {
                            console.log('삭제 버튼 클릭')
                          },
                        }
                      : {
                          title: '등록',
                          onClick: () => {
                            console.log('등록 버튼 클릭')
                            setRegisted(true)
                          },
                        }
                    : undefined
                }
              />
            </Row>
            <Row>
              <Input
                required
                type="text"
                title="SNS 정보"
                value={authorInfo?.instaId}
                placeholder="SNS 계정을 입력해 주세요."
                disabled={edit ? false : true}
                onChange={(e) =>
                  setAuthorInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, instaId: e.target.value }
                  })
                }
                button={
                  edit
                    ? {
                        title: '중복 확인',
                        onClick: () => {
                          console.log('중복 확인 버튼 클릭')
                        },
                      }
                    : undefined
                }
              />
            </Row>
            <Row>
              <Input
                type="text"
                title="프로필 메시지"
                value={authorInfo?.message ? authorInfo?.message : ''}
                placeholder={edit ? '프로필 메시지를 입력해 주세요.' : '아직 작가님의 프로필 메시지가 없어요.'}
                disabled={edit ? false : true}
                onChange={(e) =>
                  setAuthorInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, message: e.target.value }
                  })
                }
              />
            </Row>
            <Row>
              <Textarea
                title="작가 소개"
                height="2xl:h-[180px] h-[160px]"
                value={authorInfo?.introduce ? authorInfo?.introduce : ''}
                placeholder={edit ? '소개글을 입력해 주세요.' : '아직 작가님의 소개글이 없어요.'}
                disabled={edit ? false : true}
                onChange={(e) =>
                  setAuthorInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, introduce: e.target.value }
                  })
                }
              />
            </Row>
            <div className="justify-self-end flex items-center justify-center gap-4 w-full mt-auto">
              <Button
                addClass="w-[100px]"
                name={edit ? '취소' : '목록'}
                customType={type.white}
                onClick={() => {
                  if (edit) {
                    setEdit(false)
                    setAuthorInfo(originInfo)
                  } else {
                    navigate('/author')
                  }
                }}
              />
              <Button
                addClass="w-[100px]"
                name={edit ? '저장' : '수정'}
                customType={type.fill}
                onClick={() => {
                  if (edit) {
                    console.log('저장 버튼 클릭')
                  } else {
                    console.log('수정 버튼 클릭')
                  }
                  setEdit(!edit)
                }}
              />
            </div>
          </Rows>
          <div
            className={cn(
              'sticky top-0 flex flex-col justify-between w-[38%] h-full p-4 rounded-2xl bg-white shadow-light border border-transparent',
              edit && 'border-main-dark border-opacity-15',
            )}
            style={{ height: height }}
          >
            <div className="flex flex-col justify-between gap-2.5 w-full h-[54%]">
              <Title value="작가 프로필" size="large" />
              <div
                className={cn(
                  'relative flex items-center justify-center w-full h-[90%] bg-main-medium bg-opacity-20 rounded-xl overflow-hidden',
                  edit && 'cursor-pointer',
                )}
                onClick={() => imageRef.current?.click()}
              >
                <img
                  className={cn(
                    'object-contain',
                    previewImage ? 'w-full h-full' : authorInfo?.image ? 'w-full h-full' : 'w-40 h-40',
                  )}
                  src={customDefaultImg(previewImage ? previewImage : authorInfo ? authorInfo?.image : '')}
                />
                {edit && <ImageInput setFile={setFile} setPreviewImg={setPreviewImage} imageRef={imageRef} />}
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-between w-full h-[43%]">
              <div className="flex items-center justify-between">
                <Title value="작품 정보" size="large" />
                <Label
                  addClass="flex items-center gap-1 py-1 cursor-pointer"
                  onClick={() => console.log('자세히 클릭')}
                >
                  자세히
                  <IoIosArrowForward className="relative top-[1px]" />
                </Label>
              </div>
              <div className="flex flex-col w-full h-[88%] border border-default border-opacity-15 rounded-xl overflow-auto">
                <div className="flex justify-between w-full h-12 p-3 border-b border-default border-opacity-15">
                  <p className="w-[32%] text-center">작품 번호</p>
                  <p className="w-[32%] text-center">작품명</p>
                  <p className="w-[36%] text-center">태그</p>
                </div>
                {productList?.length === 0 ? (
                  <div className="flex justify-center items-center w-full h-full p-3">
                    작가님의 작품이 아직 등록되지 않았어요.
                  </div>
                ) : (
                  productList?.map((item, index) => {
                    return (
                      <div className="flex justify-between w-full h-12 p-3" key={index}>
                        <p className="w-[32%] text-center">{item.productId}</p>
                        <p className="w-[32%] text-center ellipsis">{item.title}</p>
                        <p className="w-[36%] text-center ellipsis">
                          {item.tags
                            .map((tag) => {
                              return tag.name
                            })
                            .join(', ')}
                        </p>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default AuthorDetailPage
