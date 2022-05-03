const tokenKey = 'cioco-music-token'
const timestampKey = 'cioco-music-timestamp'

export const getToken = () => localStorage.getItem(tokenKey)

export const setToken = (token: string) => localStorage.setItem(tokenKey, token)

export const removeToken = () => localStorage.removeItem(tokenKey)

export const getTimestamp = () => localStorage.getItem(timestampKey)

export const setTimestamp = () => localStorage.setItem(timestampKey, Date.now().toString())
