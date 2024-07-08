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

type postAuthorParams = {
  id: string
  message: string
  introduce: string
  name: string
  image: File | undefined
  collaborationDate: Date
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

const postAuthor = async (params: postAuthorParams) => {
  const { id, message, introduce, name, collaborationDate, image } = params

  const formData = new FormData()
  formData.append('image', image as Blob, image?.name)
  formData.append('id', id as unknown as Blob)
  formData.append('message', message as unknown as Blob)
  formData.append('introduce', introduce as unknown as Blob)
  formData.append('name', name as unknown as Blob)
  formData.append('collaborationDate', collaborationDate.toISOString() as unknown as Blob)

  try {
    const res = await customAxios.post(`/artists`, formData, {
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

export { getAuthorList, getAuthorDetail, postAuthor, deleteAuthor }
