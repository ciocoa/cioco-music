import type { Account, Binding, Profile, User } from '@/types/user'

export const useUserStore = defineStore('user', {
  state: (): User => ({
    account: {} as Account,
    bindings: [],
    // cookie: '',
    profile: {} as Profile,
    token: ''
  }),
  getters: {
    getAccount: state => state.account,
    getBindings: state => state.bindings,
    getProfile: state => state.profile,
    getToken: state => state.token
  },
  actions: {
    setAccount(data: Account) {
      this.account = data
    },
    setBindings(data: Binding[]) {
      this.bindings = data
    },
    setProfile(data: Profile) {
      this.profile = data
    },
    setToken(data: string) {
      this.token = data
    },
    removeUser() {
      this.account = {} as Account
      this.bindings = []
      // this.cookie = ''
      this.profile = {} as Profile
      this.token = ''
    }
  },
  persist: true
})
