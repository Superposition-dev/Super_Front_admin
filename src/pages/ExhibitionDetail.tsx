import { useEffect, useRef, useState } from 'react'
import Wrapper from '../components/@common/layout/Wrapper'
import Rows from '../components/@common/row/Rows'
import { useNavigate } from 'react-router-dom'
import Row from '../components/@common/row/Row'
import Input from '../components/@common/row/Input'
import Button, { type } from '../components/@common/atom/Button'
import cn from '../lib/tailwindUtil'
import Title from '../components/@common/atom/Title'
import { customDefaultImg, dateFormat } from '../utils/util'
import RadioInput from '../components/@common/row/RadioInput'
import Table, { THeadType } from '../components/@common/table/Table'
import Tr from '../components/@common/table/Tr'
import Td from '../components/@common/table/Td'
import { CSVLink } from 'react-csv'
import ImageInput from '../components/@common/row/ImageInput'

export interface ExhibitionInfoType {
  id: number
  title: string
  subTitle: string | null
  startDate: string
  endDate: string
  location: string
  isExhibited: string
  image: string | null
  createAt: string
  updateAt: string
}

const data: ExhibitionInfoType = {
  id: 1,
  title: '성수는 따뜻해',
  subTitle: '냐하하~~~',
  startDate: '2023. 09. 18',
  endDate: '2023. 10. 01',
  location: '성수동',
  isExhibited: 'prev',
  image: null,
  createAt: '',
  updateAt: '',
}

const ExhibitionDetailPage = () => {
  const [exhibitionInfo, setExhibtionInfo] = useState<ExhibitionInfoType>(data)
  const [edit, setEdit] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [height, setHeight] = useState<number>()
  const navigate = useNavigate()
  const today = new Date()
  const csvRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLInputElement>(null)

  const THeadData: THeadType[] = [
    { name: '작품코드', width: 18 },
    { name: '제목', width: 30 },
    { name: '회원 조회수', width: 13 },
    { name: 'QR 조회수', width: 13 },
    { name: '좋아요 수', width: 13 },
    { name: '구매신청 수', width: 13 },
  ]

  const TBodyData = [
    {
      code: '000000',
      title: '달콤한 머핀이 잔뜩 올라간 케이크',
      userCount: 10,
      qrCount: 30,
      likeCount: 8,
      applyCount: 2,
    },
  ]

  const header = [
    { label: '작품 코드', key: 'code' },
    { label: '제목', key: 'title' },
    { label: '회원 조회수', key: 'userCount' },
    { label: 'QR 조회수', key: 'qrCount' },
    { label: '좋아요 수', key: 'likeCount' },
    { label: '구매신청 수', key: 'applyCount' },
  ]

  useEffect(() => {
    setHeight(wrapRef?.current?.clientHeight)
  }, [wrapRef?.current])

  return (
    <Wrapper title="전시 상세 정보">
      <div className="flex w-full h-full overflow-auto pr-2" ref={wrapRef}>
        <div className="flex items-start justify-between gap-3 w-full 2xl:h-[1000px] h-[850px]">
          <Rows
            title={edit ? '전시 정보 수정' : '전시 정보'}
            addClass={cn('2xl:h-[1000px] h-[850px] w-[66%]', edit ? 'border-main-dark border-opacity-15' : '')}
          >
            <Row>
              <Input
                required
                type="text"
                title="제목"
                value={exhibitionInfo.title}
                placeholder="전시 제목을 입력해 주세요."
                disabled={edit ? false : true}
                onChange={(e) => setExhibtionInfo((prev) => ({ ...prev, title: e.target.value }))}
              />
              <Input
                required
                type="text"
                title="부제목"
                value={exhibitionInfo?.createAt}
                placeholder={edit ? '부제목을 입력해 주세요.' : '아직 등록된 부제목이 없어요.'}
                disabled={edit ? false : true}
                onChange={(e) => setExhibtionInfo((prev) => ({ ...prev, subTitle: e.target.value }))}
              />
            </Row>
            <Row>
              <Input
                required
                type="date"
                title="시작 일자"
                value={exhibitionInfo.startDate}
                placeholder=""
                disabled={edit ? false : true}
                onChange={(e) => setExhibtionInfo((prev) => ({ ...prev, startDate: e.target.value }))}
              />
              <Input
                required
                type="date"
                title="종료 일자"
                value={exhibitionInfo.endDate}
                placeholder=""
                disabled={edit ? false : true}
                onChange={(e) => setExhibtionInfo((prev) => ({ ...prev, endDate: e.target.value }))}
              />
            </Row>
            <Row>
              <Input
                required
                type="text"
                title="전시 장소"
                value={exhibitionInfo?.location}
                placeholder={edit ? '전시 장소를 입력해 주세요.' : '아직 등록된 전시 장소가 없어요.'}
                disabled={edit ? false : true}
                onChange={(e) => setExhibtionInfo((prev) => ({ ...prev, location: e.target.value }))}
              />
              <RadioInput
                required
                type="radio"
                name="statue"
                title="전시 상태"
                value={exhibitionInfo.isExhibited}
                values={[
                  { value: 'prev', text: '전시 예정' },
                  { value: 'current', text: '전시 중' },
                  { value: 'done', text: '전시 완료' },
                ]}
                disabled={edit ? false : true}
                onChange={(e) => {
                  setExhibtionInfo((prev) => ({ ...prev, status: e.target.value as 'prev' | 'current' | 'done' }))
                }}
              />
            </Row>
            <div className="flex items-center gap-3 pt-2">
              <h2 className="text-xl font-semibold">작품</h2>
              <span className="text-sm">전체 {TBodyData.length}건</span>
              <Button
                addClass="py-0.5 px-2 text-sm ml-auto rounded-md"
                name="데이터 다운로드"
                customType={type.empty}
                onClick={() => {
                  console.log('데이터 다운로드')
                  csvRef?.current?.link.click()
                }}
              />
            </div>
            <div className="w-full border-t border-default border-opacity-5" />
            <div className="relative w-full 2xl:h-[450px] h-[370px] overflow-auto p-1.5 pt-0 rounded-lg bg-gray-50 border border-gray-200">
              <Table thead={THeadData} tbody={TBodyData} index={false} theadClass="h-11">
                {TBodyData.map((item, index) => {
                  return (
                    <Tr key={index} addClass="h-10 cursor-default">
                      <Td value={item.code} />
                      <Td value={item.title} addClass="ellipsis text-center" />
                      <Td value={item.userCount} />
                      <Td value={item.qrCount} />
                      <Td value={item.likeCount} />
                      <Td value={item.applyCount} />
                    </Tr>
                  )
                })}
              </Table>
            </div>
            <div className="relative justify-self-end flex items-center justify-center gap-4 w-full mt-auto">
              <Button
                addClass="w-[100px]"
                name={edit ? '취소' : '목록'}
                customType={type.white}
                onClick={() => {
                  edit ? setEdit(false) : navigate('/exhibition')
                }}
              />
              <Button
                addClass="w-[100px]"
                name={edit ? '저장' : '수정'}
                customType={type.fill}
                onClick={() => {
                  edit && console.log('저장 버튼 클릭')
                  setEdit(!edit)
                }}
              />
              <Button
                addClass="absolute top-1/2 left-0 -translate-y-1/2"
                name="전시 삭제"
                customType={type.empty}
                onClick={() => {
                  console.log('삭제 버튼 클릭')
                }}
              />
              <CSVLink
                data={TBodyData}
                headers={header}
                filename={`${dateFormat(today)}.csv`}
                className="hidden"
                ref={csvRef}
              />
            </div>
          </Rows>
          <div
            className={cn(
              'sticky top-0 flex flex-col justify-between w-[33%] p-4 rounded-2xl bg-white shadow-light border border-transparent',
              edit && 'border-main-dark border-opacity-15',
            )}
            style={{ height: height }}
          >
            <div className="flex flex-col justify-between gap-2.5 w-full h-full">
              <Title value="전시 포스터" size="large" />
              <div
                className={cn(
                  'relative flex items-center justify-center w-full h-[96%] bg-main-medium bg-opacity-20 rounded-xl overflow-hidden',
                  edit && 'cursor-pointer',
                )}
                onClick={() => imageRef.current?.click()}
              >
                <img className="w-48 h-48" src={customDefaultImg(previewImage ? previewImage : exhibitionInfo.image)} />
                {edit && <ImageInput setImage={setImage} setPreviewImg={setPreviewImage} imageRef={imageRef} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col items-center gap-7 w-full h-full">
        <div className="flex items-start justify-between gap-3 w-full h-full pb-2">
          <div
            className={cn(
              'flex flex-col gap-3 w-[66%] h-full p-4 rounded-2xl bg-white shadow-light border border-transparent',
              edit ? 'border-main-dark border-opacity-15' : '',
            )}
          >
            <Rows title={edit ? '전시 정보 수정' : '전시 정보'} addClass={cn('w-full h-[45%] gap-4 shadow-none p-0')}>
              <div className="flex flex-col gap-3 w-full h-full overflow-auto pr-2">
                <Row>
                  <Input
                    required
                    type="text"
                    title="제목"
                    value={exhibitionInfo.title}
                    placeholder="전시 제목을 입력해 주세요."
                    disabled={edit ? false : true}
                    onChange={(e) => setExhibtionInfo((prev) => ({ ...prev, title: e.target.value }))}
                  />
                  <Input
                    required
                    type="text"
                    title="부제목"
                    value={exhibitionInfo?.createAt}
                    placeholder={edit ? '부제목을 입력해 주세요.' : '아직 등록된 부제목이 없어요.'}
                    disabled={edit ? false : true}
                    onChange={(e) => setExhibtionInfo((prev) => ({ ...prev, subTitle: e.target.value }))}
                  />
                </Row>
                <Row>
                  <Input
                    required
                    type="date"
                    title="시작 일자"
                    value={exhibitionInfo.startDate}
                    placeholder=""
                    disabled={edit ? false : true}
                    onChange={(e) => setExhibtionInfo((prev) => ({ ...prev, startDate: e.target.value }))}
                  />
                  <Input
                    required
                    type="date"
                    title="종료 일자"
                    value={exhibitionInfo.endDate}
                    placeholder=""
                    disabled={edit ? false : true}
                    onChange={(e) => setExhibtionInfo((prev) => ({ ...prev, endDate: e.target.value }))}
                  />
                </Row>
                <Row>
                  <Input
                    required
                    type="text"
                    title="전시 장소"
                    value={exhibitionInfo?.location}
                    placeholder={edit ? '전시 장소를 입력해 주세요.' : '아직 등록된 전시 장소가 없어요.'}
                    disabled={edit ? false : true}
                    onChange={(e) => setExhibtionInfo((prev) => ({ ...prev, location: e.target.value }))}
                  />
                  <RadioInput
                    required
                    type="radio"
                    name="statue"
                    title="전시 상태"
                    value={exhibitionInfo.isExhibited}
                    values={[
                      { value: 'prev', text: '전시 예정' },
                      { value: 'current', text: '전시 중' },
                      { value: 'done', text: '전시 완료' },
                    ]}
                    disabled={edit ? false : true}
                    onChange={(e) => {
                      setExhibtionInfo((prev) => ({ ...prev, status: e.target.value as 'prev' | 'current' | 'done' }))
                    }}
                  />
                </Row>
              </div>
            </Rows>
            <div className="flex flex-col gap-2 w-full h-[50%]">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">작품</h2>
                <span className="text-sm">전체 {TBodyData.length}건</span>
                <Button
                  addClass="py-0.5 px-2 text-sm ml-auto rounded-md"
                  name="데이터 다운로드"
                  customType={type.empty}
                  onClick={() => {
                    console.log('데이터 다운로드')
                    csvRef?.current?.link.click()
                  }}
                />
              </div>
              <div className="w-full h-[90%] overflow-auto p-1.5 pt-0 rounded-lg bg-gray-50 border border-gray-200">
                <Table thead={THeadData} tbody={TBodyData} index={false} theadClass="h-11">
                  {TBodyData.map((item, index) => {
                    return (
                      <Tr key={index} addClass="h-10 cursor-default">
                        <Td value={item.code} />
                        <Td value={item.title} addClass="ellipsis text-center" />
                        <Td value={item.userCount} />
                        <Td value={item.qrCount} />
                        <Td value={item.likeCount} />
                        <Td value={item.applyCount} />
                      </Tr>
                    )
                  })}
                </Table>
              </div>
            </div>
            <div className="relative justify-self-end flex items-center justify-center gap-4 w-full mt-auto">
              <Button
                addClass="w-[100px]"
                name={edit ? '취소' : '목록'}
                customType={type.white}
                onClick={() => {
                  edit ? setEdit(false) : navigate('/exhibition')
                }}
              />
              <Button
                addClass="w-[100px]"
                name={edit ? '저장' : '수정'}
                customType={type.fill}
                onClick={() => {
                  edit && console.log('저장 버튼 클릭')
                  setEdit(!edit)
                }}
              />
              <Button
                addClass="absolute top-1/2 left-0 -translate-y-1/2"
                name="전시 삭제"
                customType={type.empty}
                onClick={() => {
                  console.log('삭제 버튼 클릭')
                }}
              />
              <CSVLink
                data={TBodyData}
                headers={header}
                filename={`${dateFormat(today)}.csv`}
                className="hidden"
                ref={csvRef}
              />
            </div>
          </div>
          <div
            className={cn(
              'flex flex-col justify-between w-[33%] h-full p-4 rounded-2xl bg-white shadow-light border border-transparent',
              edit && 'border-main-dark border-opacity-15',
            )}
          >
            <div className="flex flex-col justify-between gap-2.5 w-full h-full">
              <Title value="전시 포스터" size="large" />
              <div
                className={cn(
                  'relative flex items-center justify-center w-full h-[96%] bg-main-medium bg-opacity-20 rounded-xl overflow-hidden',
                  edit && 'cursor-pointer',
                )}
                onClick={() => imageRef.current?.click()}
              >
                <img className="w-48 h-48" src={customDefaultImg(previewImage ? previewImage : exhibitionInfo.image)} />
                {edit && <ImageInput setImage={setImage} setPreviewImg={setPreviewImage} imageRef={imageRef} />}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Wrapper>
  )
}

export default ExhibitionDetailPage
