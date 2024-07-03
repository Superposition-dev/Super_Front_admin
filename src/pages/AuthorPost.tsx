import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button, { type } from '../components/@common/atom/Button'
import Wrapper from '../components/@common/layout/Wrapper'
import Rows from '../components/@common/row/Rows'
import Row from '../components/@common/row/Row'
import Input from '../components/@common/row/Input'
import Textarea from '../components/@common/row/Textarea'
import Title from '../components/@common/atom/Title'
import { customDefaultImg, dateFormat } from '../utils/util'
import cn from '../lib/tailwindUtil'
import ImageInput from '../components/@common/row/ImageInput'

export interface AuthorInfoType {
  id: string
  name: string
  introduce: string
  message: string
  userAccount?: string
  image: string
  collaborationDate: Date
}

const AuthorPostPage = () => {
  const [authorInfo, setAuthorInfo] = useState<AuthorInfoType>({
    id: '',
    name: '',
    introduce: '',
    message: '',
    userAccount: '',
    image: '',
    collaborationDate: new Date(),
  })
  const [registed, setRegisted] = useState<boolean>()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [height, setHeight] = useState<number>()
  const imageRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setHeight(wrapRef?.current?.clientHeight)
  }, [wrapRef?.current])

  console.log(authorInfo)

  return (
    <Wrapper title="작가 등록">
      <div className="flex flex-col items-center gap-7 w-full h-full overflow-auto pr-2" ref={wrapRef}>
        <div className="flex items-start justify-between gap-3 w-full 2xl:h-[900px] h-[800px]">
          <Rows title="작가 등록" addClass="border-main-dark border-opacity-15 2xl:h-[900px] h-[800px]">
            <Row>
              <Input
                required
                type="text"
                title="작가명"
                value={authorInfo?.name}
                placeholder="작가명을 입력해 주세요."
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
                disabled
                required
                type="date"
                title="작가 등록일자"
                value={dateFormat(authorInfo?.collaborationDate)}
              />
            </Row>
            <Row>
              <Input
                type="text"
                title="카카오 계정"
                value={authorInfo?.userAccount ? authorInfo?.userAccount : ''}
                placeholder={'작가와 연동할 회원의 계정을 입력해 주세요.'}
                onChange={(e) =>
                  setAuthorInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, userAccount: e.target.value }
                  })
                }
                button={
                  registed
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
                }
              />
            </Row>
            <Row>
              <Input
                required
                type="text"
                title="SNS 정보"
                value={authorInfo?.id}
                placeholder="SNS 계정을 입력해 주세요."
                onChange={(e) =>
                  setAuthorInfo((prev) => {
                    if (!prev) {
                      return prev
                    }
                    return { ...prev, id: e.target.value }
                  })
                }
                button={{
                  title: '중복 확인',
                  onClick: () => {
                    console.log('중복 확인 버튼 클릭')
                  },
                }}
              />
            </Row>
            <Row>
              <Input
                type="text"
                title="프로필 메시지"
                value={authorInfo?.message ? authorInfo?.message : ''}
                placeholder="프로필 메시지를 입력해 주세요."
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
                placeholder="소개글을 입력해 주세요."
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
                name="취소"
                customType={type.white}
                onClick={() => {
                  navigate('/author')
                }}
              />
              <Button
                addClass="w-[100px]"
                name="등록"
                customType={type.fill}
                onClick={() => {
                  console.log('등록 버튼 클릭')
                  navigate('/author')
                }}
              />
            </div>
          </Rows>
          <div
            className="sticky top-0 flex flex-col justify-between w-[38%] h-full p-4 rounded-2xl bg-white shadow-light border border-main-dark border-opacity-15"
            style={{ height: height }}
          >
            <div className="flex flex-col justify-between gap-2.5 w-full h-full">
              <Title value="작가 프로필 등록" size="large" />
              <div
                className="relative flex items-center justify-center w-full h-[94%] bg-main-medium bg-opacity-20 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => imageRef.current?.click()}
              >
                <img
                  className={cn(
                    'object-contain',
                    previewImage ? 'w-full h-full' : authorInfo.image ? 'w-full h-full' : 'w-40 h-40',
                  )}
                  src={customDefaultImg(previewImage ? previewImage : authorInfo ? authorInfo?.image : '')}
                />
                <ImageInput setFile={setFile} setPreviewImg={setPreviewImage} imageRef={imageRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default AuthorPostPage
