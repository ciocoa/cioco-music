import request from '@/service'

export const userLogin = (data: unknown) => request.post({ url: '/login/cellphone', data })

export const phoneLogin = (data: unknown) => request.get({ url: '/login/cellphone', data })

export const getUserInfo = () => request.get({ url: '/user/subcount' })

export const sentCaptcha = (data: unknown) => request.get({ url: '/captcha/sent', data })

export const verifyCaptcha = (data: unknown) => request.get({ url: '/captcha/verify', data })
