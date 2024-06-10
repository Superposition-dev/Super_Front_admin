import axios, { AxiosInstance } from 'axios'

const config = {
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  origin: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 2500,
}

const customAxios: AxiosInstance = axios.create(config)

customAxios.interceptors.request.use(
  function (config) {
    return Promise.resolve(config)
  },
  (error) => Promise.reject(error),
)

customAxios.interceptors.request.use(
  (response) => response,
  (error) => {
    console.log(error)
  },
)

export default customAxios
