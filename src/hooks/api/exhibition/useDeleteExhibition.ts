import { UseQueryOptions, useMutation } from 'react-query'
import { deleteExhibition } from './exhibition'

interface useDeleteExhibitionParams extends UseQueryOptions<any, any> {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

const useDeleteExhibition = ({ onSuccess, onError }: useDeleteExhibitionParams) => {
  const mutation = useMutation({
    mutationFn: ({ ids }: { ids: string }) => deleteExhibition({ ids }),
    onSuccess,
    onError,
  })

  return {
    onDeleteExhibiton: (ids: string) => {
      mutation.mutate({ ids })
    },
  }
}

export default useDeleteExhibition
