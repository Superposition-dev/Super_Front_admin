import { useEffect } from 'react'
import Button, { type } from './Button'

export interface SearchProps {
  filter: {
    name: string
    type: string
  }[]
  date: string
  state: {
    startDate: string | undefined
    endDate: string | undefined
    text: string | undefined
    limit: string | undefined
  }
  setState: {
    setStartDate: React.Dispatch<React.SetStateAction<string | undefined>>
    setEndDate: React.Dispatch<React.SetStateAction<string | undefined>>
    setText: React.Dispatch<React.SetStateAction<string | undefined>>
    setLimit: React.Dispatch<React.SetStateAction<string>>
  }
  handler: () => void | void
  resetHandler?: () => void | void
}

const Search = (props: SearchProps) => {
  const { filter, date, state, setState, handler, resetHandler } = props
  const { startDate, endDate, text, limit } = state
  const { setStartDate, setEndDate, setText, setLimit } = setState

  useEffect(() => {
    setLimit(filter[0].type as 'title' | 'artist')
  }, [])

  return (
    <div className="flex justify-between items-center gap-3 w-full h-fit py-3 px-4 rounded-2xl bg-white shadow-light">
      <div className="flex justify-between items-center w-[88%] h-full">
        <div className="flex justify-between items-center w-[49%] h-full">
          <p className="text-base font-semibold">{date}</p>
          <div className="flex items-center justify-between w-[88%] h-full">
            <div className="flex items-center justify-center w-[45%] h-full py-1 px-2 rounded-md border border-gray-200">
              <input
                type="date"
                name="startDate"
                className="w-full h-full px-2"
                value={startDate === undefined ? '' : startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            -
            <div className="flex items-center justify-center w-[45%] h-full py-1 px-2 rounded-md border border-gray-200">
              <input
                type="date"
                name="endDate"
                className="w-full h-full px-2"
                value={endDate === undefined ? '' : endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-[49%] h-full py-1 px-2 rounded-md border border-gray-200">
          <select
            className="flex items-center justify-center w-[16%] h-full text-base font-semibold text-center"
            defaultValue={limit}
            onChange={(e) => {
              setLimit(e.target.value as 'title' | 'artist')
            }}
          >
            {filter.map((item, index) => {
              return (
                <option key={index} value={item.type}>
                  {item.name}
                </option>
              )
            })}
          </select>
          <div className="flex justify-center items-center w-[84%] h-full ml-2 border-l border-gray-200">
            <input
              type="text"
              className="w-full h-full pl-2"
              value={text === undefined ? '' : text}
              placeholder="검색어를 입력하세요."
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 w-fit">
        <Button name="초기화" customType={type.white} onClick={resetHandler} />
        <Button name="조회" customType={type.fill} onClick={handler} />
      </div>
    </div>
  )
}

export default Search
