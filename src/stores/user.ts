import { defineStore, acceptHMRUpdate } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    loginState: false,
    userToken: getToken(),
    userInfo: {},
    userAvatar: '',
    userSongList: []
  }),
  actions: {
    setIsLogin(loginState: boolean) {
      this.loginState = loginState
    },
    setUserToken(token: string) {
      this.userToken = token
      setToken(token)
    },
    setUserInfo(info: object) {
      this.userInfo = { ...info }
    },
    setUserAvatar(avatar: string) {
      this.userAvatar = avatar
    },
    setUserSongList(songList: never[]) {
      this.userSongList = songList
    },
    removeUserToken() {
      this.userToken = ''
      removeToken()
    },
    removeUser() {
      this.userInfo = {}
      this.userAvatar = ''
      this.userSongList = []
    }
  },
  persist: {
    storage: window.sessionStorage
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
