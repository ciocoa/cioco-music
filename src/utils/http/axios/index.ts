import qs from 'qs'
import { default as axios } from 'axios'
import { ElLoading } from 'element-plus'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

import { useUserStore } from '@/stores'

interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
}

export class Axios {
  private instance: AxiosInstance
  private loading?: LoadingInstance

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config: RequestConfig) => {
        if (config.showLoading)
          this.loading = ElLoading.service({
            text: 'loading...',
            background: 'rgba(0,0,0,.1)',
            lock: true
          })
        const userStore = useUserStore()
        const token = userStore.getToken
        if (token) config.headers = { token }
        const { method } = config
        if (method === 'get')
          config.params = {
            ...config.data,
            timestamp: Date.parse(new Date().toDateString()) / 1000
          }
        if (method === 'post')
          config.data = qs.stringify({
            ...config.data,
            timestamp: Date.parse(new Date().toDateString()) / 1000
          })
        return config
      },
      (err: AxiosError) => {
        this.loading?.close()
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log(res)
        this.loading?.close()
        const { data } = res
        // if (status === 200)
        return data
      },
      (err: AxiosError) => {
        this.loading?.close()
        return Promise.reject(err.response?.data)
      }
    )
  }

  private request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<unknown, T>(config)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  get<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}
