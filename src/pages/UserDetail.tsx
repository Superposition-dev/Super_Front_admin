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
import RadioInput from '../components/@common/row/RadioInput'
import Modal from '../components/@common/ModalBox'
import ImageInput from '../components/@common/row/ImageInput'

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

const UserDetailPage = () => {
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
    <Wrapper title={'회원명'}>
      <div className="flex flex-col items-start gap-7 w-full h-full overflow-auto pr-2">
        <UserType isAuthor={userInfo.authorInfo?true:false} />
        <div className="flex items-start justify-between w-full h-full pb-2">
          <Rows title="유저 정보" addClass={edit ? 'border-main-dark border-opacity-15' : ''}>
            <Row>
              <Input
                required
                type="text"
                title="카카오 계정"
                value={userInfo?.email ? userInfo?.email : ''}
                placeholder={'아직 유저님과 연동한 계정이 없어요.'}
                disabled
                constant={edit && true}
              />
            </Row>
            <Row>
              <Input
                required
                type="text"
                title="유저명"
                value={userInfo.name}
                placeholder="유저명을 입력해 주세요."
                disabled={edit ? false : true}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                required
                type="date"
                title="가입일자"
                value={userInfo?.createAt}
                disabled
                constant={edit && true}
              />
            </Row>
            <Row>
              <RadioInput
                type="radio"
                name="gender"
                title="성별"
                value={userInfo.gender}
                values={[
                  { value: 'M', text: '남성' },
                  { value: 'F', text: '여성' },
                ]}
                disabled={edit ? false : true}
                onChange={(e) => {
                  setUserInfo((prev) => ({ ...prev, gender: e.target.value as 'M' | 'F' }))
                }}
              />
              <Input
                type="text"
                title="출생년도"
                value={userInfo.birth ? userInfo.birth : ''}
                disabled
                constant={edit && true}
              />
            </Row>
            <div className="flex flex-col gap-6 mt-6">
              <Title value="작가 정보" size="large" />
              <Row>
                <Input
                  type="text"
                  title="작가명"
                  value={userInfo?.authorInfo?.name ? userInfo?.authorInfo?.name : '-'}
                  disabled
                  constant={edit && true}
                />
                <Input
                  type="text"
                  title="작가 ID"
                  value={userInfo?.authorInfo?.id ? userInfo?.authorInfo?.id : '-'}
                  disabled
                  constant={edit && true}
                />
              </Row>
            </div>
            <div className="justify-self-end flex items-center justify-center gap-4 w-full mt-auto">
              <Button
                addClass="w-[100px]"
                name={edit ? '취소' : '목록'}
                customType={type.white}
                onClick={() => {
                  edit ? setEdit(false) : navigate('/author')
                  resetImage()
                }}
              />
              <Button
                addClass="w-[100px]"
                name={edit ? '저장' : '수정하기'}
                customType={type.fill}
                onClick={() => {
                  edit && console.log('저장 버튼 클릭')
                  setEdit(!edit)
                  resetImage()
                }}
              />
            </div>
            <Button name="탈퇴" customType={type.fill} onClick={() => setIsModal(true)} />
            <div>
              {isModal && (
                <Modal setIsModal={setIsModal} confirmText={{ okay: '탈퇴' }} confirmOkay={() => alert('탈퇴')}>
                  <p>
                    선택한 회원을 탈퇴처리 하시겠습니까?
                    <br />
                    탈퇴처리 후에는 복구가 불가능합니다.
                  </p>
                </Modal>
              )}
            </div>
          </Rows>
          <div
            className={cn(
              'flex flex-col justify-between w-[38%] h-full p-4 rounded-2xl bg-white shadow-light border border-transparent',
              edit && 'border-main-dark border-opacity-15',
            )}
          >
            <div className="flex flex-col gap-2.5 w-full h-full">
              <Title value="유저 프로필" size="large" />
              <div
                className={cn(
                  'relative flex items-center justify-center w-full h-[660px] bg-main-medium bg-opacity-20 rounded-xl overflow-hidden',
                  edit && 'cursor-pointer',
                )}
              >
                <img
                  className={cn('object-cover overflow-hidden', !userInfo.image && (!previewImg&&!imgFile) && 'w-48 h-48')}
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

export default UserDetailPage
