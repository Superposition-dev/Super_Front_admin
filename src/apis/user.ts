import customAxios from './customAxios'

export const postLogin = async ({ id, password }: { id: string; password: string }) => {
  try {
    const res = await customAxios.post('/users/login', { id: id, password: password })
    console.log(res)
    return res.data
  } catch (e) {
    console.log(e)
  }
}

export const postLogout = async () => {
  try {
    const res = await customAxios.post('/users/logout')

    return res.data
  } catch (e) {
    console.log(e)
  }
}
