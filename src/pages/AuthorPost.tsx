import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button, { type } from '../components/@common/atom/Button'
import Wrapper from '../components/@common/layout/Wrapper'
import UserType from '../components/@common/UserType'
import Rows from '../components/@common/row/Rows'
import Row from '../components/@common/row/Row'
import Input from '../components/@common/row/Input'
import Textarea from '../components/@common/row/Textarea'
import Title from '../components/@common/atom/Title'
import { customDefaultImg, dateFormat } from '../utils/util'
import { AuthorInfoType } from './AuthorDetail'
import { BiSolidMessageSquareEdit } from 'react-icons/bi'

const data: AuthorInfoType = {
  instaId: '',
  name: '',
  message: '',
  introduction: null,
  userAccount: null,
  image: '',
  isUser: false,
  createAt: dateFormat(new Date()),
  updateAt: '-',
}

const AuthorPostPage = () => {
  const [authorInfo, setAuthorInfo] = useState<AuthorInfoType>(data)
  const [registed, setRegisted] = useState<boolean>()
  const navigate = useNavigate()

  return (
    <Wrapper title="작가 등록">
      <div className="flex flex-col items-center gap-7 w-full h-full overflow-auto pr-2">
        <UserType
          general={!authorInfo.isUser}
          list={['작가', '회원 + 작가']}
          addClass="self-start border-main-dark border-opacity-15"
          onGeneral={() => setAuthorInfo((prev) => ({ ...prev, isUser: false }))}
          onNotGeneral={() => setAuthorInfo((prev) => ({ ...prev, isUser: true }))}
        />
        <div className="flex items-start justify-between gap-3 w-full h-full pb-2">
          <Rows title="작가 등록" addClass="border-main-dark border-opacity-15">
            <Row>
              <Input
                required
                type="text"
                title="작가명"
                value={authorInfo.name}
                placeholder="작가명을 입력해 주세요."
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                required
                type="date"
                title="작가 등록일자"
                value={authorInfo?.createAt}
                onChange={(e) => {
                  setAuthorInfo((prev) => ({ ...prev, createAt: e.target.value }))
                }}
              />
            </Row>
            <Row>
              <Input
                type="text"
                title="카카오 계정"
                value={authorInfo?.userAccount ? authorInfo?.userAccount : ''}
                placeholder={'작가와 연동할 회원의 계정을 입력해 주세요.'}
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, userAccount: e.target.value }))}
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
                value={authorInfo?.instaId}
                placeholder="SNS 계정을 입력해 주세요."
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, instaId: e.target.value }))}
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
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, message: e.target.value }))}
              />
            </Row>
            <Row>
              <Textarea
                title="작가 소개"
                height="2xl:h-[180px] h-[160px]"
                value={authorInfo?.introduction ? authorInfo?.introduction : ''}
                placeholder="소개글을 입력해 주세요."
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, introduction: e.target.value }))}
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
          <div className="flex flex-col justify-between w-[38%] h-full p-4 rounded-2xl bg-white shadow-light border border-main-dark border-opacity-15">
            <div className="flex flex-col justify-between gap-2.5 w-full h-[52%]">
              <Title value="작가 프로필 등록" size="large" />
              <div className="relative flex items-center justify-center w-full h-[90%] bg-main-medium bg-opacity-20 rounded-xl overflow-hidden cursor-pointer">
                <img className="w-48 h-48" src={customDefaultImg(authorInfo.image)} />
                <BiSolidMessageSquareEdit className="absolute top-1.5 right-1.5 w-12 h-12 text-main-medium" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default AuthorPostPage
