import { UseQueryOptions, useQuery } from 'react-query'
import { getAuthorList } from './author'

interface useAuthorListParams extends UseQueryOptions<any, any> {
  startDate?: string
  endDate?: string
  text?: string
  limit?: string
  page?: number
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  enabled?: boolean
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
  refetchOnMount?: boolean
}

const useAuthorList = ({
  startDate,
  endDate,
  text,
  limit,
  page,
  onSuccess,
  onError,
  enabled,
  refetchOnWindowFocus,
  refetchOnReconnect,
  refetchOnMount,
}: useAuthorListParams) => {
  return useQuery(
    ['getAuthorList', { startDate, endDate, text, limit, page }],
    () =>
      getAuthorList({
        startDate,
        endDate,
        isUser: undefined,
        searchString: text,
        filterType: limit,
        page: page,
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

export default useAuthorList
