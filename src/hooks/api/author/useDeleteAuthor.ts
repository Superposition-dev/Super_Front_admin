import { UseQueryOptions, useMutation } from 'react-query'
import { deleteAuthor } from './author'

interface useDeleteAuthorParams extends UseQueryOptions<any, any> {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

const useDeleteAuthor = ({ onSuccess, onError }: useDeleteAuthorParams) => {
  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteAuthor({ id }),
    onSuccess,
    onError,
  })

  return {
    onDeleteAuthor: (id: string) => {
      mutation.mutate({ id })
    },
  }
}

export default useDeleteAuthor
