import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

export interface AuthorInfoType {
  instaId: string
  name: string
  message: string | null
  introduction: string | null
  userAccount: string | null
  image: string | null
  isUser: boolean
  createAt: string
  updateAt: string
}

const data: AuthorInfoType = {
  instaId: 'super___',
  name: '슈퍼맨',
  message: '슈퍼맨 입니다.',
  introduction: null,
  userAccount: null,
  image: null,
  isUser: false,
  createAt: dateFormat(new Date()),
  updateAt: '-',
}

const AuthorDetailPage = () => {
  const [authorInfo, setAuthorInfo] = useState<AuthorInfoType>(data)
  const [edit, setEdit] = useState<boolean>(false)
  const [registed, setRegisted] = useState<boolean>()
  const [image, setImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const navigate = useNavigate()
  const imageRef = useRef<HTMLInputElement>(null)

  return (
    <Wrapper title="작가 상세 정보">
      <div className="flex flex-col items-center gap-7 w-full h-full overflow-auto pr-2">
        <UserType
          general={!authorInfo.isUser}
          list={['작가', '회원 + 작가']}
          addClass={`self-start ${edit ? 'border-main-dark border-opacity-15' : ''}`}
          onGeneral={() => {
            edit && setAuthorInfo((prev) => ({ ...prev, isUser: false }))
          }}
          onNotGeneral={() => {
            edit && setAuthorInfo((prev) => ({ ...prev, isUser: true }))
          }}
        />
        <div className="flex items-start justify-between gap-3 w-full 2xl:h-[800px] h-[700px]">
          <Rows
            title={edit ? '작가 정보 수정' : '작가 정보'}
            addClass={cn('2xl:h-[800px] h-[700px]', edit ? 'border-main-dark border-opacity-15' : '')}
          >
            <Row>
              <Input
                required
                type="text"
                title="작가명"
                value={authorInfo.name}
                placeholder="작가명을 입력해 주세요."
                disabled={edit ? false : true}
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                required
                type="date"
                title="작가 등록일자"
                value={authorInfo?.createAt}
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
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, userAccount: e.target.value }))}
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
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, instaId: e.target.value }))}
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
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, message: e.target.value }))}
              />
            </Row>
            <Row>
              <Textarea
                title="작가 소개"
                height="2xl:h-[180px] h-[160px]"
                value={authorInfo?.introduction ? authorInfo?.introduction : ''}
                placeholder={edit ? '소개글을 입력해 주세요.' : '아직 작가님의 소개글이 없어요.'}
                disabled={edit ? false : true}
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, introduction: e.target.value }))}
              />
            </Row>
            <div className="justify-self-end flex items-center justify-center gap-4 w-full mt-auto">
              <Button
                addClass="w-[100px]"
                name={edit ? '취소' : '목록'}
                customType={type.white}
                onClick={() => {
                  edit ? setEdit(false) : navigate('/author')
                }}
              />
              <Button
                addClass="w-[100px]"
                name={edit ? '저장' : '수정'}
                customType={type.fill}
                onClick={() => {
                  edit && console.log('저장 버튼 클릭')
                  setEdit(!edit)
                }}
              />
            </div>
          </Rows>
          <div
            className={cn(
              'flex flex-col justify-between w-[38%] h-full p-4 rounded-2xl bg-white shadow-light border border-transparent',
              edit && 'border-main-dark border-opacity-15',
            )}
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
                <img className="w-48 h-48" src={customDefaultImg(previewImage ? previewImage : authorInfo.image)} />
                {edit && <ImageInput setImage={setImage} setPreviewImg={setPreviewImage} imageRef={imageRef} />}
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
                  <p className="w-[32%] text-center">작품 코드</p>
                  <p className="w-[32%] text-center">작품명</p>
                  <p className="w-[36%] text-center">태그</p>
                </div>
                <div className="flex justify-between w-full h-12 p-3">
                  <p className="w-[32%] text-center">010101</p>
                  <p className="w-[32%] text-center ellipsis">행복한 사람들</p>
                  <p className="w-[36%] text-center ellipsis">따뜻한, 친절한, 여린</p>
                </div>
                <div className="flex justify-between w-full h-12 p-3">
                  <p className="w-[32%] text-center">010101</p>
                  <p className="w-[32%] text-center ellipsis">행복한 사람들</p>
                  <p className="w-[36%] text-center ellipsis">따뜻한, 친절한, 여린</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default AuthorDetailPage
