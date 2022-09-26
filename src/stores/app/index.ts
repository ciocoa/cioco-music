export const useAppStore = defineStore('app', {
  state: () => ({
    darkTheme: true,
    showLogin: false
  }),
  getters: {
    getDarkTheme: state => state.darkTheme,
    getShowLogin: state => state.showLogin
  },
  actions: {
    setDarkTheme(data: boolean) {
      this.darkTheme = data
    },
    setShowLogin(data: boolean) {
      this.showLogin = data
    }
  }
})
