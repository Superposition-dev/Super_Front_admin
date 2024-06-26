import { UseQueryOptions, useMutation } from 'react-query'
import { postExhibition } from './exhibition'
import { ExhibitionInfoType } from '../../../pages/ExhibitionDetail'

interface postExhibitionParams {
  endDate: string
  location: string
  productIds: number[]
  startDate: string
  status: string
  subHeading: string
  title: string
  file: File | null
}

interface usePostExhibitonParams extends UseQueryOptions<any, any> {
  params: ExhibitionInfoType
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
    productIds: params.products.map((item) => {
      return item.productId
    }),
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
