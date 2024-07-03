import { UseQueryOptions, useQuery } from 'react-query'
import { getProductList } from './product'

interface useProductListParams extends UseQueryOptions<any, any> {
  startDate?: string
  endDate?: string
  text?: string
  limit?: string
  page?: number
  size?: number
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  enabled?: boolean
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
  refetchOnMount?: boolean
}

const useProductList = ({
  startDate,
  endDate,
  text,
  limit,
  page,
  size,
  onSuccess,
  onError,
  enabled,
  refetchOnWindowFocus,
  refetchOnReconnect,
  refetchOnMount,
}: useProductListParams) => {
  return useQuery(
    ['getProductList', { startDate, endDate, text, limit, page, size }],
    () =>
      getProductList({
        startDate: startDate ? startDate : undefined,
        endDate: endDate ? endDate : undefined,
        title: limit === 'title' ? text : undefined,
        artistName: limit === 'artist' ? text : undefined,
        productId: limit === 'productId' ? Number(text) : undefined,
        page: page,
        size: size,
      }),
    {
      onSuccess,
      onError,
      enabled,
      refetchOnWindowFocus,
      refetchOnReconnect,
      refetchOnMount,
    },
  )
}

export default useProductList
