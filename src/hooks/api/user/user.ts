import customAxios from '../customAxios'

export type Body = {
  id: string
  password: string
}

export const sendLogin = async (body: Body) => {
  const { id, password } = body
  try {
    const res = await customAxios.post('/users/login', { id, password })
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
