import type { User } from '@/types/user'
import { http } from '@/utils'

type BaseParams = {
  phone: string
}

type LoginParams = BaseParams & {
  email?: string
  captcha?: string
  password?: string
  countrycode?: string
  md5_password?: string
}

type BaseResult = {
  code: number
  message?: string
}

type CaptchaResult = BaseResult & {
  data?: boolean
}

type LoginResult = BaseResult & User

export const sentCaptchaApi = (data: BaseParams) =>
  http.get<CaptchaResult>({ url: '/captcha/sent', data })

export const loginApi = (data: LoginParams) =>
  http.get<LoginResult>({ url: '/login/cellphone', data })

export const logoutApi = () => http.post<BaseResult>({ url: '/logout' })
