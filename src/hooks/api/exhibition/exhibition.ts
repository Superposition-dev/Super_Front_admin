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
  products: number[]
  startDate: string
  status: string
  subHeading: string
  title: string
  file: File | null
  poster?: string
}

type putExhibitionParams = {
  exhibitionId: number
  endDate: string
  location: string
  products: number[]
  startDate: string
  status: string
  subHeading: string
  title: string
  file?: File | null
  poster: string
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
  const { title, subHeading, location, products, startDate, endDate, status, file } = params

  const formData = new FormData()
  const requestCreateExhibition = {
    title: title,
    subHeading: subHeading,
    productIds: products,
    location: location,
    startDate: startDate,
    endDate: endDate,
    status: status,
  }

  formData.append('poster', file as Blob, file?.name)
  formData.append(
    'requestCreateExhibition',
    new Blob([JSON.stringify(requestCreateExhibition)], { type: 'application/json' }),
    'requestCreateExhibition',
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

const putExhibition = async (params: putExhibitionParams) => {
  const { exhibitionId, title, subHeading, location, products, startDate, endDate, status, file, poster } = params

  const formData = new FormData()
  const requestUpdateExhibition = {
    title: title,
    subHeading: subHeading,
    productIds: products,
    location: location,
    startDate: startDate,
    endDate: endDate,
    status: status === '전시 예정' ? 'prev' : status === '전시중' ? 'current' : status === '전시 종료' ? 'end' : '',

    oldPoster: poster,
  }

  file && formData.append('poster', file as Blob, file?.name)
  formData.append(
    'requestUpdateExhibition',
    new Blob([JSON.stringify(requestUpdateExhibition)], { type: 'application/json' }),
    'requestUpdateExhibition',
  )

  try {
    const res = await customAxios.put(`/exhibitions/${exhibitionId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        exhibitionId: exhibitionId,
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

export {
  getExhibitionList,
  getExhibitionDetail,
  postExhibition,
  putExhibition,
  patchChangeDisplayStatus,
  deleteExhibition,
}
