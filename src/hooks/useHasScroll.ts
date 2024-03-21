import { useEffect, useState, RefObject } from 'react'
import { debounce } from 'lodash'

const useHasScroll = (scrollRef: RefObject<HTMLDivElement>) => {
  const [hasScroll, setHasScroll] = useState<boolean>(false)
  useEffect(() => {
    if (!scrollRef.current) {
      return
    }

    // 렌더링 되자마자 hasScroll 이 업데이트 되도록
    setHasScroll(scrollRef.current.scrollHeight > scrollRef.current.clientHeight)

    const handleWindowResize = debounce(() => {
      if (scrollRef.current) {
        setHasScroll(scrollRef.current.scrollHeight > scrollRef.current.clientHeight)
      }
    }, 500)

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [scrollRef])

  return hasScroll
}

export default useHasScroll
