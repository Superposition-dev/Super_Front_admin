import { useState } from 'react'
import Search from '../components/@common/Search'
import Wrapper from '../components/@common/Wrapper'

export const filter = ['전체', '작가명', 'ID']

const AuthorPage = () => {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [text, setText] = useState<string>()
  const [limit, setLimit] = useState<string>()

  const state = {
    startDate,
    endDate,
    text,
    limit,
  }

  const setState = {
    setStartDate,
    setEndDate,
    setText,
    setLimit,
  }

  console.log(limit)

  const handler = () => {}
  return (
    <Wrapper title="작가관리">
      <Search filter={filter} state={state} setState={setState} handler={handler} />
    </Wrapper>
  )
}

export default AuthorPage
