import customAxios from './customAxios'

export const getExhibitions = async ({
  title,
  artistName,
  startDate,
  endDate,
}: {
  title?: string
  artistName?: string
  startDate?: string
  endDate?: string
}) => {
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
  } catch (e) {
    console.log(e)
  }
}
