import React, { useState } from 'react'
import Wrapper from '../components/@common/layout/Wrapper'
import UserType from '../components/@common/UserType'
import Rows from '../components/@common/row/Rows'
import Row from '../components/@common/row/Row'
import Input from '../components/@common/row/Input'
import Button, { type } from '../components/@common/atom/Button'
import { useNavigate } from 'react-router-dom'
import cn from '../lib/tailwindUtil'
import Title from '../components/@common/atom/Title'
import { customDefaultImg } from '../utils/util'
import ImageInput from '../components/@common/row/ImageInput'
import Textarea from '../components/@common/row/Textarea'

export interface UserType {
  num: number
  email: string
  name: string
  gender: 'M' | 'F'
  birth: string | null
  image: string | null
  userType: string
  createAt: string
  updateAt: string
  authorInfo?: {
    id: string
    name: string
  }
}

const data: UserType = {
  num: 1,
  email: 'nevacattery217@naver.com',
  name: '',
  gender: 'M',
  birth: '1996-02-17',
  image: 'https://res.cloudinary.com/dv8pharbq/image/upload/v1713291153/Profile_picture_Ai_soi7sd.jpg',
  userType: '',
  createAt: '2024-02-17',
  updateAt: '',
  authorInfo: {
    id: 'author1',
    name: '작가1',
  },
}

const ProductDetailPage = () => {
  const [userInfo, setUserInfo] = useState<UserType>(data)
  const [edit, setEdit] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [imgFile, setImgFile] = useState<File | null>(null)
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  const navigate = useNavigate()
  const resetImage = () => {
    setImgFile(null)
    setPreviewImg(null)
  }
  return (
    <Wrapper title={'작품 상세'}>
      <div className="flex flex-col items-start gap-7 w-full h-full overflow-auto pr-2">
        <div className="flex items-start justify-between w-full pb-2">
          <Rows title="작품 정보" addClass={edit ? 'border-main-dark border-opacity-15' : ''}>
            <Row>
              <Input type="text" title="작품명" value={'작품명입니다.'} disabled />
              <Input required type="text" title="작품코드" value={'KAN-134'} disabled />
            </Row>
            <Row>
              <Input required type="text" title="작가코드" value={'JACKGA-1234'} disabled />
              <Input required type="text" title="작가명" value={'김테스트'} disabled />
            </Row>
            <Row>
              <Textarea title={'작품설명'} value={'작품설명입니다.'} disabled={edit ? false : true} />
            </Row>
            <Row>
              <Input required type="text" title="작품정보" value={'유채화'} disabled />
              <Input required type="date" title="작품등록일자" value={'2024-02-17'} disabled />
            </Row>
            <div className="flex flex-col gap-2.5 w-full">
              <h4 className="font-semibold">작품 태그</h4>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <div
                    className={cn(
                      'flex items-center justify-between w-full border border-main-too-dark border-opacity-20 rounded overflow-hidden',
                    )}
                  >
                    <input className="p-2.5" />
                  </div>
                  <div
                    className={cn(
                      'flex items-center justify-between w-full border border-main-too-dark border-opacity-20 rounded overflow-hidden',
                    )}
                  >
                    <input className="p-2.5" />
                  </div>
                  <div
                    className={cn(
                      'flex items-center justify-between w-full border border-main-too-dark border-opacity-20 rounded overflow-hidden',
                    )}
                  >
                    <input className="p-2.5" />
                  </div>
                </div>
                <Button
                  addClass="h-[50px] self-end"
                  name={'태그 추가'}
                  customType={type.fill}
                  onClick={() => {
                    console.log('태그 버튼 클릭')
                  }}
                />
              </div>
            </div>
            <Row>
              <Input type="text" title="가격" value={'100,000'} disabled constant={edit && true} />
            </Row>
            <div className="flex flex-col gap-6 mt-6">
              <Title value="좋아요 내역" size="large" />
              <div className="flex flex-col w-[80%] h-[240px] border border-default border-opacity-15 rounded-xl overflow-auto">
                <div className="flex gap-20 w-full h-12 p-3 border-b border-default border-opacity-15">
                  <p className="w-[32%] text-center">닉네임</p>
                  <p className="w-[32%] text-center">카카오 계정</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
                <div className="flex gap-20 w-full h-12 p-3">
                  <p className="w-[32%] text-center">스프프프</p>
                  <p className="w-[32%] text-center ellipsis">super@naver.com</p>
                </div>
              </div>
            </div>
            <div className="justify-self-end flex items-center justify-center gap-4 w-full mt-auto">
              <Button
                addClass="w-[100px] min-w-[120px]"
                name={edit ? '취소' : '목록'}
                customType={type.white}
                onClick={() => {
                  edit ? setEdit(false) : navigate('/product')
                  resetImage()
                }}
              />
              <Button
                addClass="w-[100px] min-w-[120px]"
                name={edit ? '저장' : '수정하기'}
                customType={type.fill}
                onClick={() => {
                  edit && console.log('저장 버튼 클릭')
                  setEdit(!edit)
                  resetImage()
                }}
              />
            </div>
          </Rows>
          <div
            className={cn(
              'sticky top-0 flex flex-col justify-between w-[38%] h-[660px] p-4 rounded-2xl bg-white shadow-light border border-transparent',
              edit && 'border-main-dark border-opacity-15',
            )}
          >
            <div className="flex flex-col gap-2.5 w-full h-full">
              <Title value="작품이미지" size="large" />
              <div
                className={cn(
                  'relative flex items-center justify-center w-full h-[660px] bg-main-medium bg-opacity-20 rounded-xl overflow-hidden',
                  edit && 'cursor-pointer',
                )}
              >
                <img
                  className={cn(
                    'object-cover overflow-hidden',
                    !userInfo.image && !previewImg && !imgFile && 'w-48 h-48',
                  )}
                  src={previewImg ? customDefaultImg(previewImg) : customDefaultImg(userInfo.image)}
                />
                {edit && <ImageInput setImage={setImgFile} setPreviewImg={setPreviewImg} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default ProductDetailPage
