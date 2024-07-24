import { UseQueryOptions, useQuery } from 'react-query'
import { checkDuplicateUser } from './user'

interface useDuplicateUserParams extends UseQueryOptions<any, any> {
  name: string
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  enabled?: boolean
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
  refetchOnMount?: boolean
}

const useDuplicateUser = ({
  name,
  onSuccess,
  onError,
  enabled,
  refetchOnWindowFocus,
  refetchOnReconnect,
  refetchOnMount,
}: useDuplicateUserParams) => {
  return useQuery(
    ['checkDuplicateUser', { name }],
    () =>
      checkDuplicateUser({
        name: name,
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

export default useDuplicateUser
