import Wrapper from '../components/@common/layout/Wrapper'
import UserType from '../components/@common/UserType'

const UserDetailPage = () => {
  return (
    <Wrapper title={'회원명'}>
      <UserType general={true} list={['회원', '회원 + 작가']} />
    </Wrapper>
  )
}

export default UserDetailPage
