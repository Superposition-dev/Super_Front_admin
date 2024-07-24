import { UseQueryOptions, useMutation } from 'react-query'
import { postAuthor } from './author'

interface postAuthorParams {
  id: string
  message: string
  introduce: string
  name: string
  collaborationDate: Date
  image: File | undefined
}

interface usePostAuthorParams extends UseQueryOptions<any, any> {
  params: postAuthorParams
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

const usePostAuthor = ({ params, onSuccess, onError }: usePostAuthorParams) => {
  const mutationParams: postAuthorParams = {
    id: params.id,
    message: params.message,
    introduce: params.introduce,
    name: params.name,
    collaborationDate: params.collaborationDate,
    image: params.image ? params.image : undefined,
  }
  const mutation = useMutation({
    mutationFn: () => postAuthor(mutationParams),
    onSuccess,
    onError,
  })

  return {
    onPostAuthor: () => {
      mutation.mutate()
    },
  }
}

export default usePostAuthor
