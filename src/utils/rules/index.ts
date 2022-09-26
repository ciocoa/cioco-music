// import type { FormItemRule } from 'element-plus'
// import type { InternalRuleItem } from 'async-validator/dist-types/interface'

export const checkNotnull = (value: string, message: string) => {
  if (value.length <= 0) return Promise.reject(message)
  return Promise.resolve()
}

export const checkPhone = (value: string) => {
  // 固话号及手机号(/^0\d{2,3}-?\d{7,8}$/.test(value) || /^1[3|4|5|7|8][0-9]\d{8}$/.test(value))
  if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) return Promise.reject('手机号码不符合规范')
  return Promise.resolve()
}

export const checkEmail = (value: string) => {
  // 英文邮箱 (/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/)
  if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value))
    return Promise.reject('邮箱不符合规范')
  return Promise.resolve()
}

export const checkUsername = (value: string) => {
  if (!/^[a-zA-Z_\d]{6,10}$/.test(value))
    return Promise.reject('用户名须为6~10位的字母、数字或下划线')
  return Promise.resolve()
}

export const checkPassword = (value: string) => {
  if (!/(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])^.{6,18}$/.test(value))
    return Promise.reject('密码须为6~18位字母、数字、特殊字符组合')
  return Promise.resolve()
}
