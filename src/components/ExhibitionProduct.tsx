import { memo, useState, useRef } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import cn from '../lib/tailwindUtil'
import { customDefaultImg } from '../utils/util'
import { ProductInfoType } from '../pages/ExhibitionDetail'

interface ExhibitionProductProps {
  item: ProductInfoType
  index: number
  selectedProduct: (item: ProductInfoType) => void
  isSelected: boolean
}

const ExhibitonProduct = memo(({ item, index, selectedProduct, isSelected }: ExhibitionProductProps) => {
  const [hover, setHover] = useState(false)
  const imageItemRef = useRef<HTMLDivElement>(null)

  return (
    <div
      key={index}
      ref={imageItemRef}
      className={cn('relative w-full h-full cursor-pointer')}
      onClick={() => {
        selectedProduct(item)
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {isSelected && (
        <>
          <div className="absolute top-0 left-0 w-full h-full block bg-black bg-opacity-50 z-10 border-[5px] border-main-bright z-9"></div>
          <div className="absolute right-3 top-3 w-6 h-6 rounded-full bg-white z-10" />
          <FaCheckCircle className="absolute right-2.5 top-2.5 w-7 h-7 text-main-bright z-10" />
        </>
      )}
      <img className="w-full h-full object-cover" src={customDefaultImg(item.picture)} />
      {hover && (
        <div className="absolute top-0 left-0 flex items-end w-full h-full p-1">
          <div className="flex flex-col gap-1 w-full h-fit px-2.5 py-2 bg-black bg-opacity-75 text-white rounded-md overflow-auto">
            <p className="flex items-center justify-between w-full">
              <span className="w-[33%] text-sm">작품번호</span>
              <span className="max-w-[66%] text-sm ellipsis">{item.productId}</span>
            </p>
            <p className="flex items-start justify-between w-full">
              <span className="w-[33%] text-sm">작품제목</span>
              <span className="max-w-[66%] text-sm">{item.title}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
})

export default ExhibitonProduct
