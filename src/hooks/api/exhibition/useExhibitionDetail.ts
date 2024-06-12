import { UseQueryOptions, useQuery } from 'react-query'
import { getExhibitionDetail } from './exhibition'

interface useExhibitionDetailParams extends UseQueryOptions<any, any> {
  exhibitionId: number
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  enabled?: boolean
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
  refetchOnMount?: boolean
}

const useExhibitionDetail = ({
  exhibitionId,
  onSuccess,
  onError,
  enabled,
  refetchOnWindowFocus,
  refetchOnReconnect,
  refetchOnMount,
}: useExhibitionDetailParams) => {
  return useQuery(
    ['getExhibitionDetail', { exhibitionId }],
    () =>
      getExhibitionDetail({
        exhibitionId,
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

export default useExhibitionDetail
