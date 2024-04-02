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
import { IoIosArrowForward } from 'react-icons/io'
import { useState } from 'react'

export interface AuthorInfoType {
  num?: number
  id?: string
  name?: string
  message?: string
  introduction?: string
  image?: string
  userType?: string
  createAt?: Date
  updateAt?: Date
}

const AuthorDetailPage = () => {
  const [authorInfo, setAuthorInfo] = useState<AuthorInfoType>()
  const navigate = useNavigate()

  return (
    <Wrapper title="작가 상세 정보">
      <div className="flex flex-col items-center gap-7 w-full h-full overflow-auto pr-2">
        <UserType isAuthor={true} addClass="self-start" />
        <div className="flex items-center justify-between gap-3 w-full 2xl:h-[88%] h-full">
          <Rows title="작가 정보" width="">
            <Row>
              <Input
                type="text"
                title="작가명"
                required
                placeholder="작가명을 입력해 주세요."
                onChange={(e) => setAuthorInfo((prev) => ({ ...prev, name: e.target.value }))}
              />
            </Row>
            <Row>
              <Input type="date" title="작가 등록일자" required value={String(authorInfo?.createAt)} />
              <Input type="text" title="SNS 계정" required placeholder="SNS 계정을 입력해 주세요." />
            </Row>
            <Row>
              <Input type="text" title="프로필 메시지" required placeholder="프로필 메시지를 입력해 주세요." />
            </Row>
            <Row>
              <Textarea title="작가 소개" height="2xl:h-[200px] h-[160px]" placeholder="소개글을 입력해 주세요." />
            </Row>
            <div className="justify-self-end flex items-center justify-center gap-4 w-full mt-auto">
              <Button name="목록" customType={type.white} addClass="w-[100px]" onClick={() => navigate('/author')} />
              <Button name="수정하기" customType={type.fill} addClass="w-[100px]" />
            </div>
          </Rows>
          <div className="flex flex-col justify-between w-[38%] h-full p-5 rounded-2xl bg-white shadow-light">
            <div className="flex flex-col gap-2.5 w-full h-[55%]">
              <Title value="작가 프로필" size="large" />
              <div className="w-full h-[90%] bg-slate-200 rounded-xl" />
            </div>
            <div className="flex flex-col justify-between w-full h-[43%]">
              <div className="flex items-center justify-between">
                <Title value="작품 정보" size="large" />
                <Label
                  addClass="flex items-center gap-1 py-0.5 cursor-pointer"
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
                  <p className="w-[32%] text-center">행복한 사람들</p>
                  <p className="w-[36%] text-center">따뜻한, 친절한, 여린</p>
                </div>
                <div className="flex justify-between w-full h-12 p-3">
                  <p className="w-[32%] text-center">010101</p>
                  <p className="w-[32%] text-center">행복한 사람들</p>
                  <p className="w-[36%] text-center">따뜻한, 친절한, 여린</p>
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
