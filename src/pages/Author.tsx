import { useState } from 'react'
import Search from '../components/@common/Search'
import Wrapper from '../components/@common/Wrapper'

const AuthorPage = () => {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [text, setText] = useState<string>()

  const state = {
    startDate,
    endDate,
    text,
  }

  const setState = {
    setStartDate,
    setEndDate,
    setText,
  }

  const filter = ['전체', '작가명', 'ID']
  const handler = () => {}
  return (
    <Wrapper title="작가관리">
      <Search filter={filter} state={state} setState={setState} handler={handler} />
    </Wrapper>
  )
}

export default AuthorPage
