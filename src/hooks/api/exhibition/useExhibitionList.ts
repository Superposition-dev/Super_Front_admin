import { UseQueryOptions, useQuery } from 'react-query'
import { getExhibitionList } from './exhibition'

interface useExhibitionListParams extends UseQueryOptions<any, any> {
  startDate?: string
  endDate?: string
  text?: string
  limit?: string
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
  onSuccess,
  onError,
  enabled,
  refetchOnWindowFocus,
  refetchOnReconnect,
  refetchOnMount,
}: useExhibitionListParams) => {
  return useQuery(
    ['getExhibitionList', { startDate, endDate, text, limit }],
    () =>
      getExhibitionList({
        startDate,
        endDate,
        title: limit !== 'artist' ? text : undefined,
        artistName: limit !== 'title' ? text : undefined,
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
