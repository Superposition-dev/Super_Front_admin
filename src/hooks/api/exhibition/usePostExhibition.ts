import { UseQueryOptions, useMutation } from 'react-query'
import { postExhibition } from './exhibition'
import { ExhibitionPostInfoType } from '../../../pages/ExhibitionPost'

interface postExhibitionParams {
  endDate: string
  location: string
  products: number[]
  startDate: string
  status: string
  subHeading: string
  title: string
  file: File | null
  poster?: string
}

interface usePostExhibitonParams extends UseQueryOptions<any, any> {
  params: postExhibitionParams
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

const usePostExhibition = ({ params, onSuccess, onError }: usePostExhibitonParams) => {
  const mutationParams: postExhibitionParams = {
    title: params.title,
    subHeading: params.subHeading,
    startDate: params.startDate,
    endDate: params.endDate,
    location: params.location,
    status: params.status,
    file: params.file,
    products: params.products,
  }
  const mutation = useMutation({
    mutationFn: () => postExhibition(mutationParams),
    onSuccess,
    onError,
  })

  return {
    onPostExhibition: () => {
      mutation.mutate()
    },
  }
}

export default usePostExhibition
