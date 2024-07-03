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

const ProductEdit = () => {
  const [userInfo, setUserInfo] = useState<UserType>({})
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
          <Rows title="작품 정보" addClass={'border-main-dark border-opacity-15'}>
            <Row>
              <Input type="text" title="작품명" />
              <Input required type="text" title="작품코드" />
            </Row>
            <Row>
              <Input required type="text" title="작가코드" />
              <Input required type="text" title="작가명" />
            </Row>
            <Row>
              <Textarea title={'작품설명'} />
            </Row>
            <Row>
              <Input required type="text" title="작품정보" />
              <Input required type="date" title="작품등록일자" />
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
                  addClass="h-[50px] min-w-[120px] self-end"
                  name={'태그 추가'}
                  customType={type.fill}
                  onClick={() => {
                    console.log('태그 버튼 클릭')
                    resetImage()
                  }}
                />
              </div>
            </div>
            <Row>
              <Input type="text" title="가격" />
            </Row>
            <div className="justify-self-end flex items-center justify-center gap-4 w-full mt-auto">
              <Button
                addClass="w-[100px] min-w-[120px]"
                name={'취소'}
                customType={type.white}
                onClick={() => navigate('/product')}
              />
              <Button
                addClass="w-[100px] min-w-[120px]"
                name={'저장'}
                customType={type.fill}
                onClick={() => {
                  console.log('저장 버튼 클릭')
                  resetImage()
                }}
              />
            </div>
          </Rows>
          <div
            className={cn(
              'sticky top-0 flex flex-col justify-between w-[38%] h-[660px] p-4 rounded-2xl bg-white shadow-light border border-transparent',
              'border-main-dark border-opacity-15',
            )}
          >
            <div className="flex flex-col gap-2.5 w-full h-full">
              <Title value="작품이미지" size="large" />
              <div
                className={cn(
                  'relative flex items-center justify-center w-full h-[660px] bg-main-medium bg-opacity-20 rounded-xl overflow-hidden',
                  'cursor-pointer',
                )}
              >
                <img
                  className={cn(
                    'object-cover overflow-hidden',
                    !userInfo.image && !previewImg && !imgFile && 'w-48 h-48',
                  )}
                  src={previewImg ? customDefaultImg(previewImg) : customDefaultImg(userInfo.image)}
                />
                {<ImageInput setImage={setImgFile} setPreviewImg={setPreviewImg} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default ProductEdit
