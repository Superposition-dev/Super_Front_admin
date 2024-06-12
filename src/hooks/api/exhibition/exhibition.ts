import customAxios from '../customAxios'

type getExhibitionListParams = {
  title?: string
  artistName?: string
  startDate?: string
  endDate?: string
}

type patchChangeDisplayStatusParams = {
  exhibitionId: number
}

type getExhibitionDetailParams = {
  exhibitionId: number
}

const getExhibitionList = async (params: getExhibitionListParams) => {
  const { artistName, endDate, startDate, title } = params
  try {
    const res = await customAxios.get('/exhibitions', {
      params: {
        title: title,
        artistName: artistName,
        startDate: startDate,
        endDate: endDate,
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

const patchChangeDisplayStatus = async (params: patchChangeDisplayStatusParams) => {
  const { exhibitionId } = params
  try {
    const res = await customAxios.patch(`/exhibitions/${exhibitionId}`, {
      params: {
        exhibitionId: exhibitionId,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export { getExhibitionList, getExhibitionDetail, patchChangeDisplayStatus }
