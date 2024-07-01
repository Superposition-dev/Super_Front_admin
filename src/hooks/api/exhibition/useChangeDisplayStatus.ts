import { UseQueryOptions, useMutation } from 'react-query'
import { patchChangeDisplayStatus } from './exhibition'

interface useChangeDisplayStatusParams extends UseQueryOptions<any, any> {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

const useChangeDisplayStatus = ({ onSuccess, onError }: useChangeDisplayStatusParams) => {
  const mutation = useMutation({
    mutationFn: ({ exhibitionId, isDisplay }: { exhibitionId: number; isDisplay: boolean }) =>
      patchChangeDisplayStatus({ exhibitionId, isDisplay }),
    onSuccess,
    onError,
  })

  return {
    onChangeDisplayStatus: (exhibitionId: number, isDisplay: boolean) => {
      mutation.mutate({ exhibitionId, isDisplay })
    },
  }
}

export default useChangeDisplayStatus
