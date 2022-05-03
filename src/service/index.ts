import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { AxiosInstance } from 'axios'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
import type { IRequestConfig } from '@/interfaces/service'

import { getToken } from '@/utils/auth'

class Request {
  private instance: AxiosInstance
  private loading?: LoadingInstance
  private showLoading: boolean

  constructor(config: IRequestConfig) {
    this.showLoading = config.showLoading ?? false
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      config => {
        if (this.showLoading)
          this.loading = ElLoading.service({
            text: 'loading...',
            background: 'rgba(0,0,0,.1)',
            lock: true
          })
        const token = getToken()
        if (token) config.headers = { token }
        const { method } = config
        if (method === 'GET')
          config.params = {
            ...config.data,
            timestamp: Date.parse(new Date().toDateString()) / 1000
          }
        if (method === 'POST')
          config.data = {
            ...config.data,
            timestamp: Date.parse(new Date().toDateString()) / 1000
          }
        return config
      },
      err => {
        this.loading?.close()
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      res => {
        setTimeout(() => this.loading?.close(), 3000)
        return res
      },
      err => {
        this.loading?.close()
        Promise.reject(err)
      }
    )
  }

  private request<T>(config: IRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!config.showLoading) this.showLoading = false
      this.instance
        .request<unknown, T>(config)
        .then(res => {
          this.showLoading = false
          resolve(res)
        })
        .catch(err => {
          this.showLoading = false
          reject(err)
        })
    })
  }

  get<T>(config: IRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: IRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}

export default new Request({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
  withCredentials: true
})
