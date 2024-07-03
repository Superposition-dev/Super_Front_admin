import { UseQueryOptions, useQuery } from 'react-query'
import { getExhibitionList } from './exhibition'

interface useExhibitionListParams extends UseQueryOptions<any, any> {
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

const useExhibitionList = ({
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
}: useExhibitionListParams) => {
  return useQuery(
    ['getExhibitionList', { startDate, endDate, text, limit, page }],
    () =>
      getExhibitionList({
        startDate,
        endDate,
        title: limit === 'title' ? text : undefined,
        artistName: limit === 'artist' ? text : undefined,
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

export default useExhibitionList
