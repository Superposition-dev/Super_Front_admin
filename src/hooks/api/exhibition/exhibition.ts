import customAxios from '../customAxios'

type getExhibitionListParams = {
  title?: string
  artistName?: string
  startDate?: string
  endDate?: string
  page?: number
}

type getExhibitionDetailParams = {
  exhibitionId: number
}

type postExhibitionParams = {
  endDate: string
  location: string
  productIds: number[]
  startDate: string
  status: string
  subHeading: string
  title: string
  file: File | null
}

type deleteExhibitionParams = {
  ids: string
}

type patchChangeDisplayStatusParams = {
  exhibitionId: number
  isDisplay: boolean
}

const getExhibitionList = async (params: getExhibitionListParams) => {
  const { artistName, endDate, startDate, title, page } = params
  try {
    const res = await customAxios.get('/exhibitions', {
      params: {
        title: title,
        artistName: artistName,
        startDate: startDate,
        endDate: endDate,
        page: page,
        size: 10,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const getExhibitionDetail = async (params: getExhibitionDetailParams) => {
  const { exhibitionId } = params
  try {
    const res = await customAxios.get(`/exhibitions/${exhibitionId}`, {
      params: {
        exhibitionId: exhibitionId,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const postExhibition = async (params: postExhibitionParams) => {
  const { title, subHeading, location, productIds, startDate, endDate, status, file } = params

  const formData = new FormData()
  const requestCreateExhibition = {
    title: title,
    subHeading: subHeading,
    productIds: JSON.stringify(productIds),
    // productIds: JSON.stringify([1]),
    location: location,
    startDate: startDate,
    endDate: endDate,
    status: status,
  }
  formData.append('poster', (file as Blob) ?? '')
  formData.append(
    'requestCreateExhibition',
    new Blob([JSON.stringify(requestCreateExhibition)], { type: 'application/json' }),
  )

  try {
    const res = await customAxios.post(`/exhibitions`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(res)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const deleteExhibition = async (params: deleteExhibitionParams) => {
  const { ids } = params
  try {
    const res = await customAxios.delete(`/exhibitions`, {
      params: {
        ids: ids,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const patchChangeDisplayStatus = async (params: patchChangeDisplayStatusParams) => {
  const { exhibitionId, isDisplay } = params
  try {
    const res = await customAxios.patch(
      `/exhibitions/${exhibitionId}`,
      { isDisplay: isDisplay ? 1 : 0 },
      {
        params: {
          exhibitionId: exhibitionId,
        },
      },
    )
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export { getExhibitionList, getExhibitionDetail, postExhibition, patchChangeDisplayStatus, deleteExhibition }
