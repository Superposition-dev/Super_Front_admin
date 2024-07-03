import customAxios from '../customAxios'

type getProductListParams = {
  title?: string
  artistName?: string
  productId?: number
  startDate?: string
  endDate?: string
  page?: number
  size?: number
}

const getProductList = async (params: getProductListParams) => {
  const { title, artistName, productId, endDate, startDate, page, size } = params
  try {
    const res = await customAxios.get('/products', {
      params: {
        title: title,
        artistName: artistName,
        productId: productId,
        startDate: startDate,
        endDate: endDate,
        page: page,
        size: size,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export { getProductList }
