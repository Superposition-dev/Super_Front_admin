import { UseQueryOptions, useMutation } from 'react-query'
import { patchChangeDisplayStatus } from './exhibition'

interface useChangeDisplayStatus extends UseQueryOptions<any, any> {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

const useChangeDisplayStatus = ({ onSuccess, onError }: useChangeDisplayStatus) => {
  const mutation = useMutation({
    mutationFn: ({ exhibitionId }: { exhibitionId: number }) => patchChangeDisplayStatus({ exhibitionId }),
    onSuccess,
    onError,
  })

  return {
    onChangeDisplayStatus: (exhibitionId: number) => {
      mutation.mutate({ exhibitionId })
    },
  }
}

export default useChangeDisplayStatus
