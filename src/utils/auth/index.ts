export const getLocal = <T>(key: string): T => JSON.parse(localStorage.getItem(key) as string)

export const setLocal = <T>(key: string, data: T) => localStorage.setItem(key, JSON.stringify(data))

export const delLocal = (key: string) => localStorage.removeItem(key)

export const getSession = <T>(key: string): T => JSON.parse(sessionStorage.getItem(key) as string)

export const setSession = <T>(key: string, data: T) =>
  sessionStorage.setItem(key, JSON.stringify(data))

export const delSession = (key: string) => sessionStorage.removeItem(key)
