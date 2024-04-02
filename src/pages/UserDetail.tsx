import React from 'react'
import Wrapper from '../components/@common/layout/Wrapper'
import UserType from '../components/@common/UserType'

const UserDetailPage = () => {
  return (
    <Wrapper title={'회원명'}>
      <UserType isAuthor={true} />
    </Wrapper>
  )
}

export default UserDetailPage
