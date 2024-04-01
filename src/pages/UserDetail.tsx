import React from 'react'
import Wrapper from '../components/@common/Wrapper'
import UserType from '../components/@common/UserType'

const UserDetail = () => {
  return (
    <Wrapper title={'회원명'}>
      <UserType isAuthor={true} />
      
    </Wrapper>
  )
}

export default UserDetail
