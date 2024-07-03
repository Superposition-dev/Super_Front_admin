import customAxios from '../customAxios'

type getAuthorListParams = {
  startDate?: string
  endDate?: string
  isUser?: boolean
  searchString?: string
  filterType?: string
  page?: number
}

type getAuthorDetailParams = {
  id: string
}

type deleteAuthorParams = {
  id: string
}

const getAuthorList = async (params: getAuthorListParams) => {
  const { endDate, startDate, isUser, searchString, filterType, page } = params
  try {
    const res = await customAxios.get('/artists', {
      params: {
        startDate: startDate,
        endDate: endDate,
        isUser: isUser,
        searchString: searchString,
        filterType: filterType,
        page: page,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const getAuthorDetail = async (params: getAuthorDetailParams) => {
  const { id } = params
  try {
    const res = await customAxios.get(`/artists/one`, {
      params: {
        id: id,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const deleteAuthor = async (params: deleteAuthorParams) => {
  const { id } = params
  try {
    const res = await customAxios.delete(`/artists`, {
      params: {
        id: id,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export { getAuthorList, getAuthorDetail, deleteAuthor }
