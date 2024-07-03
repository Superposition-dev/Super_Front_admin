import { UseQueryOptions, useMutation } from 'react-query'
import { putExhibition } from './exhibition'

interface putExhibitionParams {
  exhibitionId: number
  endDate: string
  location: string
  products: number[]
  startDate: string
  status: string
  subHeading: string
  title: string
  poster: string
  file?: File | null
}

interface usePutExhibitonParams extends UseQueryOptions<any, any> {
  params: putExhibitionParams
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

const usePutExhibition = ({ params, onSuccess, onError }: usePutExhibitonParams) => {
  const mutationParams: putExhibitionParams = {
    exhibitionId: params.exhibitionId,
    title: params.title,
    subHeading: params.subHeading,
    startDate: params.startDate,
    endDate: params.endDate,
    location: params.location,
    status: params.status,
    products: params.products,
    file: params.file,
    poster: params.poster,
  }
  const mutation = useMutation({
    mutationFn: () => putExhibition(mutationParams),
    onSuccess,
    onError,
  })

  return {
    onPutExhibition: () => {
      mutation.mutate()
    },
  }
}

export default usePutExhibition
