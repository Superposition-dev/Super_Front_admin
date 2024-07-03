import { UseQueryOptions, useQuery } from 'react-query'
import { getAuthorDetail } from './author'

interface useAuthorDetailParams extends UseQueryOptions<any, any> {
  id: string
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  enabled?: boolean
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
  refetchOnMount?: boolean
}

const useAuthorDetail = ({
  id,
  onSuccess,
  onError,
  enabled,
  refetchOnWindowFocus,
  refetchOnReconnect,
  refetchOnMount,
}: useAuthorDetailParams) => {
  return useQuery(
    ['getExhibitionDetail', { id }],
    () =>
      getAuthorDetail({
        id,
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

export default useAuthorDetail
