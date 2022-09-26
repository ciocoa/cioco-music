import { Axios } from './axios'

const baseURL = import.meta.env.VITE_APP_BASE_API

export const http = new Axios({
  baseURL,
  timeout: 10 * 1000,
  withCredentials: true
})
