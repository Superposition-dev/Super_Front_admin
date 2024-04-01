import Wrapper from '../components/@common/Wrapper'
import Modal from '../components/@common/ModalBox'
import { useState } from 'react'
import Button, { type } from '../components/@common/Button'

const MainPage = () => {
  const [isModal, setIsModal] = useState<boolean>(false)

  return (
    <Wrapper title="대시보드">
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
    </Wrapper>
  )
}

export default MainPage
