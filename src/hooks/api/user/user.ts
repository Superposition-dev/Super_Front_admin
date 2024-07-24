import customAxios from '../customAxios'

export type Body = {
  id: string
  password: string
}

export interface CheckDuplicateUserParams {
  name: string
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

export const checkDuplicateUser = async (params: CheckDuplicateUserParams) => {
  const { name } = params
  try {
    const res = await customAxios.get(`/members/check-name`, {
      params: {
        name: name,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
    return error
  }
}
